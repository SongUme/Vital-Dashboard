import sqlite3
from pathlib import Path

# DB 파일 상대경로 설정 (배포 환경: backend/data/)
BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "data" / "vital_hospital_reviews.db"

# 로컬 환경 fallback (기존 DB/ 폴더 호환)
if not DB_PATH.exists():
    DB_PATH = BASE_DIR.parent / "DB" / "vital_hospital_reviews.db"


def get_db_connection():
    """
    SQLite 데이터베이스 커넥션을 반환합니다.
    row_factory를 sqlite3.Row로 설정하여 딕셔너리 형태로 결과에 접근할 수 있게 합니다.
    """
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn
