import urllib.request
import urllib.parse
import json
import sys

def get_json(url):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def test_api():
    try:
        options = get_json('http://127.0.0.1:8000/api/options')
    except Exception as e:
        print("API Server not running:", e)
        return

    districts = options.get('districts', [])
    specialties = options.get('specialties', [])
    
    for d in districts:
        for s in specialties:
            # Test rankings
            url = f"http://127.0.0.1:8000/api/rankings?district={urllib.parse.quote(d)}&specialty={urllib.parse.quote(s)}"
            res = get_json(url)
            for row in res:
                if row.get('district_name') != d or row.get('specialty_name') != s:
                    print(f"[FAIL] rankings?district={d}&specialty={s}")
                    print(f"잘못 포함된 병원: {row.get('hospital_name')}, district_name={row.get('district_name')}, specialty_name={row.get('specialty_name')}")
                    sys.exit(1)
            print(f"[PASS] {d} + {s} rankings: {len(res)} rows, districts=['{d}'], specialties=['{s}']")
            
            # Test hospitals
            url = f"http://127.0.0.1:8000/api/hospitals?district={urllib.parse.quote(d)}&specialty={urllib.parse.quote(s)}"
            res = get_json(url)
            for row in res:
                if row.get('district_name') != d or row.get('specialty_name') != s:
                    print(f"[FAIL] hospitals?district={d}&specialty={s}")
                    print(f"잘못 포함된 병원: {row.get('hospital_name')}, district_name={row.get('district_name')}, specialty_name={row.get('specialty_name')}")
                    sys.exit(1)
            print(f"[PASS] {d} + {s} hospitals: {len(res)} rows, districts=['{d}'], specialties=['{s}']")

if __name__ == "__main__":
    test_api()
