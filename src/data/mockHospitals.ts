import type { Hospital } from '../types/hospital';

export const mockHospitals: Hospital[] = [
  {
    "id": "h15",
    "name": "매탄성내과의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 5477,
    "totalScore": 93.3,
    "districtRank": 1,
    "districtTotal": 71,
    "cityRank": 2,
    "cityTotal": 382,
    "positiveRate": 89.9,
    "negativeRate": 7.1,
    "status": "낮은우선",
    "statusDescription": "매탄성내과의원은 낮은우선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 78,
        "marketAvg": 63.3,
        "top10Avg": 81.5
      },
      {
        "name": "증상/처방/수액",
        "score": 51.3,
        "marketAvg": 42,
        "top10Avg": 58.3
      },
      {
        "name": "상담/설명/신뢰",
        "score": 55.3,
        "marketAvg": 54.3,
        "top10Avg": 62.4
      },
      {
        "name": "친절/응대",
        "score": 80.8,
        "marketAvg": 75.7,
        "top10Avg": 95.2
      },
      {
        "name": "예약/대기/운영",
        "score": 61.5,
        "marketAvg": 50.3,
        "top10Avg": 72.4
      },
      {
        "name": "비용/시설/접근성",
        "score": 81.8,
        "marketAvg": 74.6,
        "top10Avg": 86.2
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 593,
        "avgMentions": 461,
        "diff": 131,
        "sentimentScore": 73.1,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "친절함",
        "category": "일반",
        "mentions": 1782,
        "avgMentions": 147,
        "diff": 264,
        "sentimentScore": 79.8,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "합리적 가격",
        "category": "일반",
        "mentions": 1033,
        "avgMentions": 561,
        "diff": 150,
        "sentimentScore": 82.5,
        "description": "합리적 가격에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "전문성",
        "category": "일반",
        "mentions": 489,
        "avgMentions": 475,
        "diff": 120,
        "sentimentScore": 85,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 1667,
        "avgMentions": 784,
        "diff": 66,
        "sentimentScore": 91.5,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 261,
        "avgMentions": 458,
        "diff": 97,
        "sentimentScore": 29.5,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 329,
        "avgMentions": 497,
        "diff": 93,
        "sentimentScore": 45.2,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 698,
        "avgMentions": 205,
        "diff": 179,
        "sentimentScore": 21.4,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 201,
        "avgMentions": 74,
        "diff": 51,
        "sentimentScore": 36.4,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 832,
        "avgMentions": 127,
        "diff": 191,
        "sentimentScore": 37.3,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 93.5,
      "satisfaction": 93.3
    },
    "improvementActions": [
      "예약 시간대별 대기시간 안내",
      "대기 공간 편의시설 확충",
      "첫 방문 고객 대상 안내 프로세스 개선",
      "진료비 사전 안내 체계 도입"
    ]
  },
  {
    "id": "h9",
    "name": "서울베스트내과의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 1556,
    "totalScore": 87.5,
    "districtRank": 2,
    "districtTotal": 55,
    "cityRank": 4,
    "cityTotal": 402,
    "positiveRate": 82.4,
    "negativeRate": 13.4,
    "status": "낮은우선",
    "statusDescription": "서울베스트내과의원은 낮은우선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 91.6,
        "marketAvg": 92.4,
        "top10Avg": 95
      },
      {
        "name": "증상/처방/수액",
        "score": 71.5,
        "marketAvg": 58.7,
        "top10Avg": 84.7
      },
      {
        "name": "상담/설명/신뢰",
        "score": 57.5,
        "marketAvg": 46,
        "top10Avg": 68.7
      },
      {
        "name": "친절/응대",
        "score": 85.7,
        "marketAvg": 76.5,
        "top10Avg": 96.4
      },
      {
        "name": "예약/대기/운영",
        "score": 89.8,
        "marketAvg": 82.9,
        "top10Avg": 101.2
      },
      {
        "name": "비용/시설/접근성",
        "score": 92.1,
        "marketAvg": 74.6,
        "top10Avg": 105
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 1481,
        "avgMentions": 938,
        "diff": 431,
        "sentimentScore": 96.7,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 333,
        "avgMentions": 928,
        "diff": 80,
        "sentimentScore": 79,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "현대적 장비",
        "category": "일반",
        "mentions": 862,
        "avgMentions": 209,
        "diff": 19,
        "sentimentScore": 95,
        "description": "현대적 장비에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 880,
        "avgMentions": 770,
        "diff": 296,
        "sentimentScore": 96.9,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 1905,
        "avgMentions": 428,
        "diff": 365,
        "sentimentScore": 90.8,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 207,
        "avgMentions": 308,
        "diff": 191,
        "sentimentScore": 22.6,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 840,
        "avgMentions": 139,
        "diff": 47,
        "sentimentScore": 29.9,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 854,
        "avgMentions": 467,
        "diff": 88,
        "sentimentScore": 44.2,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 800,
        "avgMentions": 102,
        "diff": 37,
        "sentimentScore": 35.9,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 473,
        "avgMentions": 235,
        "diff": 140,
        "sentimentScore": 33,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 40.4,
      "satisfaction": 87.5
    },
    "improvementActions": [
      "진료비 사전 안내 체계 도입",
      "예약 시간대별 대기시간 안내",
      "온라인 예약 시스템 도입",
      "주차 및 접근성 안내 강화"
    ]
  },
  {
    "id": "h16",
    "name": "수원튼튼정형외과",
    "city": "수원시",
    "district": "권선구",
    "department": "치과",
    "reviewCount": 14140,
    "totalScore": 87.4,
    "districtRank": 3,
    "districtTotal": 98,
    "cityRank": 3,
    "cityTotal": 455,
    "positiveRate": 58.2,
    "negativeRate": 5.4,
    "status": "낮은우선",
    "statusDescription": "수원튼튼정형외과은 낮은우선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 82.8,
        "marketAvg": 83.7,
        "top10Avg": 86.9
      },
      {
        "name": "증상/처방/수액",
        "score": 84.4,
        "marketAvg": 90.8,
        "top10Avg": 90.2
      },
      {
        "name": "상담/설명/신뢰",
        "score": 75.8,
        "marketAvg": 65.7,
        "top10Avg": 89.1
      },
      {
        "name": "친절/응대",
        "score": 91,
        "marketAvg": 87.3,
        "top10Avg": 98.7
      },
      {
        "name": "예약/대기/운영",
        "score": 91,
        "marketAvg": 78.9,
        "top10Avg": 105.2
      },
      {
        "name": "비용/시설/접근성",
        "score": 65.7,
        "marketAvg": 58.2,
        "top10Avg": 67.8
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 705,
        "avgMentions": 946,
        "diff": 220,
        "sentimentScore": 92.7,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 829,
        "avgMentions": 904,
        "diff": 142,
        "sentimentScore": 87.1,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 1480,
        "avgMentions": 962,
        "diff": 31,
        "sentimentScore": 94.1,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "친절함",
        "category": "일반",
        "mentions": 896,
        "avgMentions": 367,
        "diff": 486,
        "sentimentScore": 86.9,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 492,
        "avgMentions": 535,
        "diff": 279,
        "sentimentScore": 82.1,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 973,
        "avgMentions": 290,
        "diff": 177,
        "sentimentScore": 41.3,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 151,
        "avgMentions": 480,
        "diff": 52,
        "sentimentScore": 22.9,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 585,
        "avgMentions": 330,
        "diff": 178,
        "sentimentScore": 36.7,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 876,
        "avgMentions": 412,
        "diff": 148,
        "sentimentScore": 39.6,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 133,
        "avgMentions": 267,
        "diff": 80,
        "sentimentScore": 44.5,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 90,
      "satisfaction": 87.4
    },
    "improvementActions": [
      "비급여 진료 항목별 세부 안내표 제공",
      "주차 및 접근성 안내 강화",
      "대기 공간 편의시설 확충",
      "건강검진 패키지 안내 강화"
    ]
  },
  {
    "id": "h1",
    "name": "휴내과의원",
    "city": "수원시",
    "district": "영통구",
    "department": "내과",
    "reviewCount": 6832,
    "totalScore": 86.4,
    "districtRank": 4,
    "districtTotal": 87,
    "cityRank": 5,
    "cityTotal": 252,
    "positiveRate": 57.3,
    "negativeRate": 17.4,
    "status": "유지강화",
    "statusDescription": "휴내과의원은 중요도와 만족도가 모두 높은 유지강화 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 82.4,
        "marketAvg": 81.5,
        "top10Avg": 89.5
      },
      {
        "name": "증상/처방/수액",
        "score": 55.3,
        "marketAvg": 52.7,
        "top10Avg": 68.6
      },
      {
        "name": "상담/설명/신뢰",
        "score": 86.6,
        "marketAvg": 83.9,
        "top10Avg": 89.6
      },
      {
        "name": "친절/응대",
        "score": 93.3,
        "marketAvg": 75.8,
        "top10Avg": 106.7
      },
      {
        "name": "예약/대기/운영",
        "score": 72.3,
        "marketAvg": 53,
        "top10Avg": 74.6
      },
      {
        "name": "비용/시설/접근성",
        "score": 80.1,
        "marketAvg": 80.8,
        "top10Avg": 94
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 976,
        "avgMentions": 89,
        "diff": 40,
        "sentimentScore": 77.7,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 1129,
        "avgMentions": 768,
        "diff": 134,
        "sentimentScore": 90.5,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 296,
        "avgMentions": 941,
        "diff": 169,
        "sentimentScore": 85.6,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "합리적 가격",
        "category": "일반",
        "mentions": 1080,
        "avgMentions": 382,
        "diff": 30,
        "sentimentScore": 70.1,
        "description": "합리적 가격에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "전문성",
        "category": "일반",
        "mentions": 543,
        "avgMentions": 186,
        "diff": 280,
        "sentimentScore": 73.7,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 327,
        "avgMentions": 500,
        "diff": 158,
        "sentimentScore": 36.4,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 700,
        "avgMentions": 186,
        "diff": 9,
        "sentimentScore": 34.4,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 131,
        "avgMentions": 106,
        "diff": 114,
        "sentimentScore": 39.5,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 753,
        "avgMentions": 434,
        "diff": 18,
        "sentimentScore": 39.2,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 951,
        "avgMentions": 37,
        "diff": 179,
        "sentimentScore": 29.2,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 74.2,
      "satisfaction": 86.4
    },
    "improvementActions": [
      "온라인 예약 시스템 도입",
      "건강검진 패키지 안내 강화",
      "첫 방문 고객 대상 안내 프로세스 개선",
      "주차 및 접근성 안내 강화"
    ],
    "keywordPositions": [
      { "name": "친절함", "importance": 95, "satisfaction": 92, "reviewCount": 1120, "avgSentiment": 94, "status": "유지강화", "insight": "친절함은 중요도와 만족도가 모두 높아 현재 병원의 핵심 강점으로 분석됩니다." },
      { "name": "전문성", "importance": 88, "satisfaction": 85, "reviewCount": 850, "avgSentiment": 89, "status": "유지강화", "insight": "우수한 의료진의 전문성이 환자들에게 높은 신뢰를 주고 있습니다." },
      { "name": "대기시간", "importance": 92, "satisfaction": 35, "reviewCount": 940, "avgSentiment": 31, "status": "집중개선", "insight": "대기시간은 중요도는 높지만 만족도가 낮아 우선적인 개선이 필요한 요소입니다." },
      { "name": "예약 시스템", "importance": 85, "satisfaction": 42, "reviewCount": 610, "avgSentiment": 39, "status": "집중개선", "insight": "예약의 편의성과 프로세스 개선이 시급합니다." },
      { "name": "최신 장비", "importance": 45, "satisfaction": 88, "reviewCount": 320, "avgSentiment": 91, "status": "과잉가능", "insight": "장비 수준에 대한 만족도는 높으나, 환자의 병원 선택에 미치는 상대적 중요도는 낮습니다." },
      { "name": "인테리어", "importance": 30, "satisfaction": 90, "reviewCount": 210, "avgSentiment": 95, "status": "과잉가능", "insight": "쾌적한 시설은 긍정적이나 자원 투입 대비 효과성이 낮을 수 있습니다." },
      { "name": "주차 편의", "importance": 40, "satisfaction": 35, "reviewCount": 430, "avgSentiment": 40, "status": "낮은우선", "insight": "만족도가 낮지만 환자들이 상대적으로 중요하게 생각하지 않는 요소입니다." },
      { "name": "접근성", "importance": 45, "satisfaction": 45, "reviewCount": 180, "avgSentiment": 48, "status": "낮은우선", "insight": "현재 위치나 교통편에 대한 언급이 있으나 핵심 개선 순위는 아닙니다." }
    ],
    "sentimentTrends": [
      { "date": "03/01", "sentimentScore": 73, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "03/08", "sentimentScore": 68, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "03/15", "sentimentScore": 63, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "03/22", "sentimentScore": 75, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [
          { "reviewDate": "2024-03-20", "content": "원장님이 꼼꼼하게 잘 봐주셨고 설명도 친절했습니다.", "sentiment": "긍정", "keywords": ["친절", "전문성"] },
          { "reviewDate": "2024-03-21", "content": "병원 시설이 깔끔하고 주차도 생각보다 편해서 좋았습니다.", "sentiment": "긍정", "keywords": ["시설", "주차"] },
          { "reviewDate": "2024-03-23", "content": "대기가 살짝 있었지만 진료 퀄리티는 괜찮았어요.", "sentiment": "보통", "keywords": ["대기시간"] }
        ] 
      },
      { "date": "03/29", "sentimentScore": 66, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "04/05", "sentimentScore": 62, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "04/12", "sentimentScore": 40, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "04/19", "sentimentScore": 36, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": true, "anomalyReviews": [
          { "reviewDate": "2024-04-12", "content": "예약 시간보다 40분 넘게 기다렸어요. 예약 시스템이 바뀌고 대기가 너무 길어졌어요.", "sentiment": "부정", "keywords": ["대기시간", "예약 시스템"] },
          { "reviewDate": "2024-04-15", "content": "접수하고 진료볼 때까지 한참 걸렸어요. 대기 시간이 너무 길어서 힘들었습니다.", "sentiment": "부정", "keywords": ["접수 지연", "대기시간"] },
          { "reviewDate": "2024-04-18", "content": "최근 들어 대기 시간이 부쩍 길어진 것 같아요. 직원분들도 바빠 보이고 정신없어요.", "sentiment": "부정", "keywords": ["대기시간", "혼잡함"] }
        ]
      },
      { "date": "04/26", "sentimentScore": 32, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": true, "anomalyReviews": [
          { "reviewDate": "2024-04-21", "content": "도대체 언제까지 기다려야 하나요? 시스템 개선이 필요해 보입니다.", "sentiment": "부정", "keywords": ["대기시간", "불만"] },
          { "reviewDate": "2024-04-24", "content": "사람이 너무 많아서 앉을 자리도 부족하고 대기도 1시간 넘게 했네요.", "sentiment": "부정", "keywords": ["대기시간", "시설 혼잡"] }
        ]
      },
      { "date": "05/03", "sentimentScore": 48, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] },
      { "date": "05/10", "sentimentScore": 68, "mean": 62, "ucl": 85, "lcl": 39, "isAnomaly": false, "anomalyReviews": [] }
    ]
  },
  {
    "id": "h11",
    "name": "365힐링의원",
    "city": "수원시",
    "district": "권선구",
    "department": "치과",
    "reviewCount": 6645,
    "totalScore": 86.4,
    "districtRank": 5,
    "districtTotal": 90,
    "cityRank": 8,
    "cityTotal": 253,
    "positiveRate": 64.3,
    "negativeRate": 14.5,
    "status": "집중개선",
    "statusDescription": "365힐링의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 56.2,
        "marketAvg": 50.4,
        "top10Avg": 68.4
      },
      {
        "name": "증상/처방/수액",
        "score": 56.6,
        "marketAvg": 61,
        "top10Avg": 70.2
      },
      {
        "name": "상담/설명/신뢰",
        "score": 66.9,
        "marketAvg": 69.3,
        "top10Avg": 76.1
      },
      {
        "name": "친절/응대",
        "score": 86.3,
        "marketAvg": 79.5,
        "top10Avg": 91.3
      },
      {
        "name": "예약/대기/운영",
        "score": 96,
        "marketAvg": 94.8,
        "top10Avg": 101.6
      },
      {
        "name": "비용/시설/접근성",
        "score": 69.5,
        "marketAvg": 68.6,
        "top10Avg": 81
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 1432,
        "avgMentions": 613,
        "diff": 205,
        "sentimentScore": 70.4,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "친절함",
        "category": "일반",
        "mentions": 392,
        "avgMentions": 949,
        "diff": 482,
        "sentimentScore": 74,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "현대적 장비",
        "category": "일반",
        "mentions": 1755,
        "avgMentions": 938,
        "diff": 358,
        "sentimentScore": 83.9,
        "description": "현대적 장비에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "전문성",
        "category": "일반",
        "mentions": 837,
        "avgMentions": 436,
        "diff": 364,
        "sentimentScore": 81.5,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 190,
        "avgMentions": 888,
        "diff": 318,
        "sentimentScore": 85.6,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 527,
        "avgMentions": 280,
        "diff": 143,
        "sentimentScore": 39.3,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 325,
        "avgMentions": 437,
        "diff": 54,
        "sentimentScore": 27.7,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 268,
        "avgMentions": 401,
        "diff": 68,
        "sentimentScore": 30.8,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 674,
        "avgMentions": 46,
        "diff": 133,
        "sentimentScore": 29.3,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 215,
        "avgMentions": 425,
        "diff": 135,
        "sentimentScore": 33,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 43.8,
      "satisfaction": 86.4
    },
    "improvementActions": [
      "온라인 예약 시스템 도입",
      "대기 공간 편의시설 확충",
      "진료비 사전 안내 체계 도입",
      "주차 및 접근성 안내 강화"
    ]
  },
  {
    "id": "h2",
    "name": "용인속편한내과의원",
    "city": "수원시",
    "district": "팔달구",
    "department": "내과",
    "reviewCount": 2672,
    "totalScore": 83.6,
    "districtRank": 6,
    "districtTotal": 59,
    "cityRank": 8,
    "cityTotal": 351,
    "positiveRate": 53.9,
    "negativeRate": 17.1,
    "status": "집중개선",
    "statusDescription": "용인속편한내과의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 70.9,
        "marketAvg": 79,
        "top10Avg": 72.2
      },
      {
        "name": "증상/처방/수액",
        "score": 76.4,
        "marketAvg": 57.9,
        "top10Avg": 84.5
      },
      {
        "name": "상담/설명/신뢰",
        "score": 93.9,
        "marketAvg": 97,
        "top10Avg": 108.8
      },
      {
        "name": "친절/응대",
        "score": 51.3,
        "marketAvg": 36.9,
        "top10Avg": 65.7
      },
      {
        "name": "예약/대기/운영",
        "score": 58.3,
        "marketAvg": 49.2,
        "top10Avg": 59.1
      },
      {
        "name": "비용/시설/접근성",
        "score": 80.2,
        "marketAvg": 75.9,
        "top10Avg": 83.2
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "친절함",
        "category": "일반",
        "mentions": 1925,
        "avgMentions": 340,
        "diff": 229,
        "sentimentScore": 81.5,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1706,
        "avgMentions": 331,
        "diff": 62,
        "sentimentScore": 79.2,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 1643,
        "avgMentions": 415,
        "diff": 497,
        "sentimentScore": 96.1,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "전문성",
        "category": "일반",
        "mentions": 1980,
        "avgMentions": 547,
        "diff": 234,
        "sentimentScore": 85.2,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 308,
        "avgMentions": 470,
        "diff": 122,
        "sentimentScore": 89.5,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 352,
        "avgMentions": 498,
        "diff": 6,
        "sentimentScore": 39.9,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 325,
        "avgMentions": 212,
        "diff": 175,
        "sentimentScore": 39.2,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 903,
        "avgMentions": 77,
        "diff": 23,
        "sentimentScore": 31.1,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 737,
        "avgMentions": 427,
        "diff": 30,
        "sentimentScore": 46.9,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 561,
        "avgMentions": 76,
        "diff": 165,
        "sentimentScore": 45.4,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 37,
      "satisfaction": 83.6
    },
    "improvementActions": [
      "예약 시간대별 대기시간 안내",
      "대기 공간 편의시설 확충",
      "진료비 사전 안내 체계 도입",
      "건강검진 패키지 안내 강화"
    ]
  },
  {
    "id": "h5",
    "name": "유레카내과의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 13226,
    "totalScore": 82.3,
    "districtRank": 7,
    "districtTotal": 61,
    "cityRank": 8,
    "cityTotal": 285,
    "positiveRate": 72.6,
    "negativeRate": 23.9,
    "status": "집중개선",
    "statusDescription": "유레카내과의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 65.3,
        "marketAvg": 46.6,
        "top10Avg": 67.3
      },
      {
        "name": "증상/처방/수액",
        "score": 61.1,
        "marketAvg": 52.7,
        "top10Avg": 69.2
      },
      {
        "name": "상담/설명/신뢰",
        "score": 50.7,
        "marketAvg": 59,
        "top10Avg": 55.3
      },
      {
        "name": "친절/응대",
        "score": 76.4,
        "marketAvg": 57.8,
        "top10Avg": 82.9
      },
      {
        "name": "예약/대기/운영",
        "score": 96.3,
        "marketAvg": 78.3,
        "top10Avg": 104.6
      },
      {
        "name": "비용/시설/접근성",
        "score": 81.9,
        "marketAvg": 63.4,
        "top10Avg": 83
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 863,
        "avgMentions": 905,
        "diff": 11,
        "sentimentScore": 93.2,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 776,
        "avgMentions": 926,
        "diff": 116,
        "sentimentScore": 94.5,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 791,
        "avgMentions": 325,
        "diff": 327,
        "sentimentScore": 81.3,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "합리적 가격",
        "category": "일반",
        "mentions": 1947,
        "avgMentions": 528,
        "diff": 443,
        "sentimentScore": 95.3,
        "description": "합리적 가격에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "친절함",
        "category": "일반",
        "mentions": 369,
        "avgMentions": 650,
        "diff": 54,
        "sentimentScore": 72.9,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 225,
        "avgMentions": 219,
        "diff": 35,
        "sentimentScore": 32.3,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 327,
        "avgMentions": 59,
        "diff": 182,
        "sentimentScore": 43.7,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 921,
        "avgMentions": 158,
        "diff": 180,
        "sentimentScore": 31.2,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 886,
        "avgMentions": 90,
        "diff": 17,
        "sentimentScore": 34.4,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 566,
        "avgMentions": 458,
        "diff": 166,
        "sentimentScore": 34.4,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 77.2,
      "satisfaction": 82.3
    },
    "improvementActions": [
      "첫 방문 고객 대상 안내 프로세스 개선",
      "진료비 사전 안내 체계 도입",
      "건강검진 패키지 안내 강화",
      "예약 시간대별 대기시간 안내"
    ]
  },
  {
    "id": "h10",
    "name": "처음처럼내과의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 6683,
    "totalScore": 81.4,
    "districtRank": 8,
    "districtTotal": 85,
    "cityRank": 8,
    "cityTotal": 267,
    "positiveRate": 63,
    "negativeRate": 23.2,
    "status": "집중개선",
    "statusDescription": "처음처럼내과의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 83.4,
        "marketAvg": 69.3,
        "top10Avg": 86.6
      },
      {
        "name": "증상/처방/수액",
        "score": 51,
        "marketAvg": 34.4,
        "top10Avg": 60.6
      },
      {
        "name": "상담/설명/신뢰",
        "score": 65.4,
        "marketAvg": 48.6,
        "top10Avg": 73.1
      },
      {
        "name": "친절/응대",
        "score": 50.5,
        "marketAvg": 31.1,
        "top10Avg": 51
      },
      {
        "name": "예약/대기/운영",
        "score": 94.4,
        "marketAvg": 101.9,
        "top10Avg": 95.6
      },
      {
        "name": "비용/시설/접근성",
        "score": 56.2,
        "marketAvg": 50.5,
        "top10Avg": 64.8
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "현대적 장비",
        "category": "일반",
        "mentions": 1241,
        "avgMentions": 931,
        "diff": 114,
        "sentimentScore": 82.8,
        "description": "현대적 장비에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 961,
        "avgMentions": 877,
        "diff": 252,
        "sentimentScore": 84.9,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 1677,
        "avgMentions": 99,
        "diff": 457,
        "sentimentScore": 74.2,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 1785,
        "avgMentions": 107,
        "diff": 58,
        "sentimentScore": 74.2,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1754,
        "avgMentions": 339,
        "diff": 234,
        "sentimentScore": 97.1,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 312,
        "avgMentions": 197,
        "diff": 33,
        "sentimentScore": 44.4,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 286,
        "avgMentions": 279,
        "diff": 183,
        "sentimentScore": 31.6,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 601,
        "avgMentions": 45,
        "diff": 160,
        "sentimentScore": 29.1,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 340,
        "avgMentions": 433,
        "diff": 14,
        "sentimentScore": 26.5,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 514,
        "avgMentions": 249,
        "diff": 71,
        "sentimentScore": 33.1,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 70.9,
      "satisfaction": 81.4
    },
    "improvementActions": [
      "첫 방문 고객 대상 안내 프로세스 개선",
      "온라인 예약 시스템 도입",
      "진료비 사전 안내 체계 도입",
      "예약 시간대별 대기시간 안내"
    ]
  },
  {
    "id": "h8",
    "name": "영통탑내과의원",
    "city": "수원시",
    "district": "영통구",
    "department": "내과",
    "reviewCount": 9649,
    "totalScore": 80.5,
    "districtRank": 9,
    "districtTotal": 68,
    "cityRank": 10,
    "cityTotal": 440,
    "positiveRate": 67,
    "negativeRate": 16.7,
    "status": "낮은우선",
    "statusDescription": "영통탑내과의원은 낮은우선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 95.2,
        "marketAvg": 90.8,
        "top10Avg": 97.7
      },
      {
        "name": "증상/처방/수액",
        "score": 77.2,
        "marketAvg": 69.4,
        "top10Avg": 89.6
      },
      {
        "name": "상담/설명/신뢰",
        "score": 61,
        "marketAvg": 47.6,
        "top10Avg": 67.6
      },
      {
        "name": "친절/응대",
        "score": 72.3,
        "marketAvg": 61.9,
        "top10Avg": 77.4
      },
      {
        "name": "예약/대기/운영",
        "score": 87.5,
        "marketAvg": 84.2,
        "top10Avg": 96.6
      },
      {
        "name": "비용/시설/접근성",
        "score": 84.1,
        "marketAvg": 64.2,
        "top10Avg": 95.4
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 478,
        "avgMentions": 92,
        "diff": 396,
        "sentimentScore": 84.5,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1667,
        "avgMentions": 812,
        "diff": 348,
        "sentimentScore": 88.5,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "합리적 가격",
        "category": "일반",
        "mentions": 222,
        "avgMentions": 842,
        "diff": 109,
        "sentimentScore": 82.2,
        "description": "합리적 가격에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 1588,
        "avgMentions": 988,
        "diff": 277,
        "sentimentScore": 93.2,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 1482,
        "avgMentions": 479,
        "diff": 217,
        "sentimentScore": 90.4,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 708,
        "avgMentions": 444,
        "diff": 147,
        "sentimentScore": 22.9,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 430,
        "avgMentions": 439,
        "diff": 84,
        "sentimentScore": 47.1,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 935,
        "avgMentions": 398,
        "diff": 16,
        "sentimentScore": 26.5,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 685,
        "avgMentions": 95,
        "diff": 150,
        "sentimentScore": 38.9,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 90,
        "avgMentions": 376,
        "diff": 186,
        "sentimentScore": 35.5,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 77.8,
      "satisfaction": 80.5
    },
    "improvementActions": [
      "주차 및 접근성 안내 강화",
      "비급여 진료 항목별 세부 안내표 제공",
      "온라인 예약 시스템 도입",
      "건강검진 패키지 안내 강화"
    ]
  },
  {
    "id": "h4",
    "name": "나누리수원병원",
    "city": "수원시",
    "district": "영통구",
    "department": "정형외과",
    "reviewCount": 1956,
    "totalScore": 79.1,
    "districtRank": 10,
    "districtTotal": 68,
    "cityRank": 13,
    "cityTotal": 262,
    "positiveRate": 50.6,
    "negativeRate": 27.3,
    "status": "과잉가능",
    "statusDescription": "나누리수원병원은 과잉가능 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 54.8,
        "marketAvg": 44.5,
        "top10Avg": 64.2
      },
      {
        "name": "증상/처방/수액",
        "score": 84.1,
        "marketAvg": 89.8,
        "top10Avg": 88
      },
      {
        "name": "상담/설명/신뢰",
        "score": 85.1,
        "marketAvg": 84.8,
        "top10Avg": 91.9
      },
      {
        "name": "친절/응대",
        "score": 77.3,
        "marketAvg": 78.2,
        "top10Avg": 89.2
      },
      {
        "name": "예약/대기/운영",
        "score": 87.5,
        "marketAvg": 72.1,
        "top10Avg": 100.9
      },
      {
        "name": "비용/시설/접근성",
        "score": 96.8,
        "marketAvg": 85.1,
        "top10Avg": 109.5
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1043,
        "avgMentions": 874,
        "diff": 353,
        "sentimentScore": 79.7,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 205,
        "avgMentions": 397,
        "diff": 215,
        "sentimentScore": 70.8,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "전문성",
        "category": "일반",
        "mentions": 1007,
        "avgMentions": 448,
        "diff": 414,
        "sentimentScore": 82.7,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 917,
        "avgMentions": 653,
        "diff": 369,
        "sentimentScore": 78.7,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "친절함",
        "category": "일반",
        "mentions": 1084,
        "avgMentions": 475,
        "diff": 395,
        "sentimentScore": 82.7,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 550,
        "avgMentions": 310,
        "diff": 145,
        "sentimentScore": 49.9,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 703,
        "avgMentions": 343,
        "diff": 138,
        "sentimentScore": 26.4,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 640,
        "avgMentions": 195,
        "diff": 196,
        "sentimentScore": 40.6,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 786,
        "avgMentions": 156,
        "diff": 67,
        "sentimentScore": 26.2,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 405,
        "avgMentions": 338,
        "diff": 26,
        "sentimentScore": 45.8,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 67.1,
      "satisfaction": 79.1
    },
    "improvementActions": [
      "비급여 진료 항목별 세부 안내표 제공",
      "진료비 사전 안내 체계 도입",
      "주차 및 접근성 안내 강화",
      "온라인 예약 시스템 도입"
    ]
  },
  {
    "id": "h17",
    "name": "영통미소치과",
    "city": "수원시",
    "district": "팔달구",
    "department": "정형외과",
    "reviewCount": 13698,
    "totalScore": 72,
    "districtRank": 11,
    "districtTotal": 72,
    "cityRank": 13,
    "cityTotal": 250,
    "positiveRate": 67.3,
    "negativeRate": 5.5,
    "status": "유지강화",
    "statusDescription": "영통미소치과은 중요도와 만족도가 모두 높은 유지강화 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 94.7,
        "marketAvg": 96.8,
        "top10Avg": 108.4
      },
      {
        "name": "증상/처방/수액",
        "score": 63.7,
        "marketAvg": 67.8,
        "top10Avg": 63.9
      },
      {
        "name": "상담/설명/신뢰",
        "score": 89.6,
        "marketAvg": 94.9,
        "top10Avg": 95.6
      },
      {
        "name": "친절/응대",
        "score": 78.2,
        "marketAvg": 79.6,
        "top10Avg": 86
      },
      {
        "name": "예약/대기/운영",
        "score": 94.2,
        "marketAvg": 85.7,
        "top10Avg": 100.5
      },
      {
        "name": "비용/시설/접근성",
        "score": 63.6,
        "marketAvg": 52.9,
        "top10Avg": 77
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 1309,
        "avgMentions": 903,
        "diff": 49,
        "sentimentScore": 83.3,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 1159,
        "avgMentions": 585,
        "diff": 248,
        "sentimentScore": 86.2,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 408,
        "avgMentions": 697,
        "diff": 259,
        "sentimentScore": 75,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "현대적 장비",
        "category": "일반",
        "mentions": 1581,
        "avgMentions": 128,
        "diff": 216,
        "sentimentScore": 76.3,
        "description": "현대적 장비에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 833,
        "avgMentions": 152,
        "diff": 390,
        "sentimentScore": 90.2,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 612,
        "avgMentions": 226,
        "diff": 152,
        "sentimentScore": 29.9,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 594,
        "avgMentions": 179,
        "diff": 113,
        "sentimentScore": 36.5,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 675,
        "avgMentions": 125,
        "diff": 67,
        "sentimentScore": 31.2,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 224,
        "avgMentions": 81,
        "diff": 187,
        "sentimentScore": 21.1,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 911,
        "avgMentions": 412,
        "diff": 129,
        "sentimentScore": 43.1,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 98.2,
      "satisfaction": 72
    },
    "improvementActions": [
      "진료비 사전 안내 체계 도입",
      "주차 및 접근성 안내 강화",
      "비급여 진료 항목별 세부 안내표 제공",
      "예약 시간대별 대기시간 안내"
    ]
  },
  {
    "id": "h20",
    "name": "권선제일내과의원",
    "city": "수원시",
    "district": "장안구",
    "department": "내과",
    "reviewCount": 2829,
    "totalScore": 71.1,
    "districtRank": 12,
    "districtTotal": 78,
    "cityRank": 13,
    "cityTotal": 403,
    "positiveRate": 77,
    "negativeRate": 19.2,
    "status": "집중개선",
    "statusDescription": "권선제일내과의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 94.6,
        "marketAvg": 78,
        "top10Avg": 107.2
      },
      {
        "name": "증상/처방/수액",
        "score": 56.9,
        "marketAvg": 57.2,
        "top10Avg": 57.4
      },
      {
        "name": "상담/설명/신뢰",
        "score": 79.7,
        "marketAvg": 84.8,
        "top10Avg": 85.9
      },
      {
        "name": "친절/응대",
        "score": 69.4,
        "marketAvg": 61.6,
        "top10Avg": 78.3
      },
      {
        "name": "예약/대기/운영",
        "score": 92.5,
        "marketAvg": 85.1,
        "top10Avg": 103.2
      },
      {
        "name": "비용/시설/접근성",
        "score": 97.2,
        "marketAvg": 94.7,
        "top10Avg": 97.8
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 922,
        "avgMentions": 137,
        "diff": 389,
        "sentimentScore": 80,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 419,
        "avgMentions": 948,
        "diff": 259,
        "sentimentScore": 90.6,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "전문성",
        "category": "일반",
        "mentions": 1530,
        "avgMentions": 533,
        "diff": 403,
        "sentimentScore": 72.6,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 131,
        "avgMentions": 789,
        "diff": 342,
        "sentimentScore": 82.3,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 1073,
        "avgMentions": 869,
        "diff": 338,
        "sentimentScore": 81.6,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 994,
        "avgMentions": 21,
        "diff": 54,
        "sentimentScore": 38.6,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 847,
        "avgMentions": 43,
        "diff": 77,
        "sentimentScore": 37.1,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 662,
        "avgMentions": 76,
        "diff": 183,
        "sentimentScore": 37.6,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 71,
        "avgMentions": 336,
        "diff": 20,
        "sentimentScore": 40.6,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 799,
        "avgMentions": 89,
        "diff": 171,
        "sentimentScore": 25.1,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 83,
      "satisfaction": 71.1
    },
    "improvementActions": [
      "주차 및 접근성 안내 강화",
      "예약 시간대별 대기시간 안내",
      "대기 공간 편의시설 확충",
      "진료비 사전 안내 체계 도입"
    ]
  },
  {
    "id": "h18",
    "name": "팔달맑은피부과",
    "city": "수원시",
    "district": "팔달구",
    "department": "피부과",
    "reviewCount": 2386,
    "totalScore": 70.3,
    "districtRank": 13,
    "districtTotal": 57,
    "cityRank": 16,
    "cityTotal": 341,
    "positiveRate": 70.2,
    "negativeRate": 14.1,
    "status": "유지강화",
    "statusDescription": "팔달맑은피부과은 중요도와 만족도가 모두 높은 유지강화 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 65.8,
        "marketAvg": 72.7,
        "top10Avg": 65.9
      },
      {
        "name": "증상/처방/수액",
        "score": 88.7,
        "marketAvg": 87.4,
        "top10Avg": 100.3
      },
      {
        "name": "상담/설명/신뢰",
        "score": 83.8,
        "marketAvg": 89.8,
        "top10Avg": 84.8
      },
      {
        "name": "친절/응대",
        "score": 64.7,
        "marketAvg": 65.5,
        "top10Avg": 77.6
      },
      {
        "name": "예약/대기/운영",
        "score": 90.5,
        "marketAvg": 86.3,
        "top10Avg": 92.5
      },
      {
        "name": "비용/시설/접근성",
        "score": 74.7,
        "marketAvg": 82,
        "top10Avg": 87.3
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "친절함",
        "category": "일반",
        "mentions": 1329,
        "avgMentions": 922,
        "diff": 223,
        "sentimentScore": 72.8,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "전문성",
        "category": "일반",
        "mentions": 1950,
        "avgMentions": 974,
        "diff": 355,
        "sentimentScore": 85.5,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 477,
        "avgMentions": 352,
        "diff": 55,
        "sentimentScore": 94.3,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 611,
        "avgMentions": 256,
        "diff": 309,
        "sentimentScore": 98.6,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 562,
        "avgMentions": 276,
        "diff": 233,
        "sentimentScore": 74,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 555,
        "avgMentions": 298,
        "diff": 158,
        "sentimentScore": 32.4,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 269,
        "avgMentions": 465,
        "diff": 193,
        "sentimentScore": 32.4,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 187,
        "avgMentions": 466,
        "diff": 128,
        "sentimentScore": 36.3,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 178,
        "avgMentions": 307,
        "diff": 158,
        "sentimentScore": 29.9,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 294,
        "avgMentions": 395,
        "diff": 195,
        "sentimentScore": 34.4,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 52.1,
      "satisfaction": 70.3
    },
    "improvementActions": [
      "진료비 사전 안내 체계 도입",
      "예약 시간대별 대기시간 안내",
      "대기 공간 편의시설 확충",
      "온라인 예약 시스템 도입"
    ]
  },
  {
    "id": "h6",
    "name": "광교제일내과의원",
    "city": "수원시",
    "district": "장안구",
    "department": "내과",
    "reviewCount": 1657,
    "totalScore": 68,
    "districtRank": 14,
    "districtTotal": 66,
    "cityRank": 17,
    "cityTotal": 341,
    "positiveRate": 81.8,
    "negativeRate": 22.5,
    "status": "집중개선",
    "statusDescription": "광교제일내과의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 80.4,
        "marketAvg": 89.6,
        "top10Avg": 84.5
      },
      {
        "name": "증상/처방/수액",
        "score": 51.8,
        "marketAvg": 56,
        "top10Avg": 52.6
      },
      {
        "name": "상담/설명/신뢰",
        "score": 56.2,
        "marketAvg": 40.1,
        "top10Avg": 66.4
      },
      {
        "name": "친절/응대",
        "score": 70.4,
        "marketAvg": 61,
        "top10Avg": 76.4
      },
      {
        "name": "예약/대기/운영",
        "score": 62.7,
        "marketAvg": 61.1,
        "top10Avg": 65.4
      },
      {
        "name": "비용/시설/접근성",
        "score": 86.3,
        "marketAvg": 67.4,
        "top10Avg": 98.2
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1246,
        "avgMentions": 783,
        "diff": 174,
        "sentimentScore": 70.5,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 1242,
        "avgMentions": 595,
        "diff": 412,
        "sentimentScore": 79.3,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 433,
        "avgMentions": 233,
        "diff": 92,
        "sentimentScore": 90.7,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "합리적 가격",
        "category": "일반",
        "mentions": 777,
        "avgMentions": 323,
        "diff": 199,
        "sentimentScore": 97.5,
        "description": "합리적 가격에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 857,
        "avgMentions": 809,
        "diff": 339,
        "sentimentScore": 90.8,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 394,
        "avgMentions": 39,
        "diff": 147,
        "sentimentScore": 37.3,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 468,
        "avgMentions": 235,
        "diff": 131,
        "sentimentScore": 49.9,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 75,
        "avgMentions": 284,
        "diff": 118,
        "sentimentScore": 44.9,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 706,
        "avgMentions": 149,
        "diff": 23,
        "sentimentScore": 31.3,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 423,
        "avgMentions": 21,
        "diff": 5,
        "sentimentScore": 31.7,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 89.5,
      "satisfaction": 68
    },
    "improvementActions": [
      "대기 공간 편의시설 확충",
      "진료비 사전 안내 체계 도입",
      "예약 시간대별 대기시간 안내",
      "주차 및 접근성 안내 강화"
    ]
  },
  {
    "id": "h13",
    "name": "하나의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 6662,
    "totalScore": 67.5,
    "districtRank": 15,
    "districtTotal": 93,
    "cityRank": 17,
    "cityTotal": 281,
    "positiveRate": 81.4,
    "negativeRate": 24.3,
    "status": "과잉가능",
    "statusDescription": "하나의원은 과잉가능 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 60.6,
        "marketAvg": 40.7,
        "top10Avg": 74.7
      },
      {
        "name": "증상/처방/수액",
        "score": 95.7,
        "marketAvg": 89.6,
        "top10Avg": 101.4
      },
      {
        "name": "상담/설명/신뢰",
        "score": 85.9,
        "marketAvg": 76.9,
        "top10Avg": 92.4
      },
      {
        "name": "친절/응대",
        "score": 66.6,
        "marketAvg": 54.6,
        "top10Avg": 81
      },
      {
        "name": "예약/대기/운영",
        "score": 61.9,
        "marketAvg": 57,
        "top10Avg": 68.8
      },
      {
        "name": "비용/시설/접근성",
        "score": 92.6,
        "marketAvg": 81.1,
        "top10Avg": 101.6
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1929,
        "avgMentions": 297,
        "diff": 416,
        "sentimentScore": 84,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "전문성",
        "category": "일반",
        "mentions": 1072,
        "avgMentions": 924,
        "diff": 239,
        "sentimentScore": 94.2,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "친절함",
        "category": "일반",
        "mentions": 1597,
        "avgMentions": 170,
        "diff": 198,
        "sentimentScore": 79.1,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 223,
        "avgMentions": 78,
        "diff": 79,
        "sentimentScore": 92.7,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 1988,
        "avgMentions": 886,
        "diff": 269,
        "sentimentScore": 74.3,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 394,
        "avgMentions": 26,
        "diff": 114,
        "sentimentScore": 47.4,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 767,
        "avgMentions": 381,
        "diff": 33,
        "sentimentScore": 31.4,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 236,
        "avgMentions": 213,
        "diff": 8,
        "sentimentScore": 26.9,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 967,
        "avgMentions": 261,
        "diff": 187,
        "sentimentScore": 40.1,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 761,
        "avgMentions": 266,
        "diff": 129,
        "sentimentScore": 26.3,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 58.3,
      "satisfaction": 67.5
    },
    "improvementActions": [
      "온라인 예약 시스템 도입",
      "예약 시간대별 대기시간 안내",
      "진료비 사전 안내 체계 도입",
      "건강검진 패키지 안내 강화"
    ]
  },
  {
    "id": "h14",
    "name": "광교푸른내과의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 5871,
    "totalScore": 67.5,
    "districtRank": 16,
    "districtTotal": 68,
    "cityRank": 20,
    "cityTotal": 353,
    "positiveRate": 73.2,
    "negativeRate": 27.4,
    "status": "유지강화",
    "statusDescription": "광교푸른내과의원은 중요도와 만족도가 모두 높은 유지강화 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 92.2,
        "marketAvg": 75.4,
        "top10Avg": 98.1
      },
      {
        "name": "증상/처방/수액",
        "score": 71,
        "marketAvg": 61.5,
        "top10Avg": 83.3
      },
      {
        "name": "상담/설명/신뢰",
        "score": 94.2,
        "marketAvg": 80.8,
        "top10Avg": 107.1
      },
      {
        "name": "친절/응대",
        "score": 76.9,
        "marketAvg": 58.9,
        "top10Avg": 90.1
      },
      {
        "name": "예약/대기/운영",
        "score": 55.3,
        "marketAvg": 53.3,
        "top10Avg": 60.1
      },
      {
        "name": "비용/시설/접근성",
        "score": 84.5,
        "marketAvg": 73.4,
        "top10Avg": 86.9
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 1006,
        "avgMentions": 284,
        "diff": 259,
        "sentimentScore": 75.7,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 834,
        "avgMentions": 737,
        "diff": 459,
        "sentimentScore": 91.5,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "합리적 가격",
        "category": "일반",
        "mentions": 631,
        "avgMentions": 123,
        "diff": 73,
        "sentimentScore": 79.1,
        "description": "합리적 가격에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 236,
        "avgMentions": 743,
        "diff": 212,
        "sentimentScore": 77.3,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 1252,
        "avgMentions": 202,
        "diff": 332,
        "sentimentScore": 80.9,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 93,
        "avgMentions": 337,
        "diff": 164,
        "sentimentScore": 25.1,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 972,
        "avgMentions": 500,
        "diff": 139,
        "sentimentScore": 49.6,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 888,
        "avgMentions": 30,
        "diff": 72,
        "sentimentScore": 24.7,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 325,
        "avgMentions": 86,
        "diff": 148,
        "sentimentScore": 40.3,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 700,
        "avgMentions": 480,
        "diff": 6,
        "sentimentScore": 20.1,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 32.3,
      "satisfaction": 67.5
    },
    "improvementActions": [
      "첫 방문 고객 대상 안내 프로세스 개선",
      "온라인 예약 시스템 도입",
      "주차 및 접근성 안내 강화",
      "비급여 진료 항목별 세부 안내표 제공"
    ]
  },
  {
    "id": "h3",
    "name": "바른준내과의원",
    "city": "수원시",
    "district": "영통구",
    "department": "내과",
    "reviewCount": 8528,
    "totalScore": 67.1,
    "districtRank": 17,
    "districtTotal": 83,
    "cityRank": 20,
    "cityTotal": 485,
    "positiveRate": 83,
    "negativeRate": 28.4,
    "status": "낮은우선",
    "statusDescription": "바른준내과의원은 낮은우선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 77,
        "marketAvg": 82.2,
        "top10Avg": 77
      },
      {
        "name": "증상/처방/수액",
        "score": 63.2,
        "marketAvg": 70.2,
        "top10Avg": 63.7
      },
      {
        "name": "상담/설명/신뢰",
        "score": 74.9,
        "marketAvg": 79,
        "top10Avg": 77.8
      },
      {
        "name": "친절/응대",
        "score": 61.4,
        "marketAvg": 52,
        "top10Avg": 61.8
      },
      {
        "name": "예약/대기/운영",
        "score": 73.9,
        "marketAvg": 79,
        "top10Avg": 85.4
      },
      {
        "name": "비용/시설/접근성",
        "score": 68.5,
        "marketAvg": 48.8,
        "top10Avg": 79.7
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 1721,
        "avgMentions": 690,
        "diff": 288,
        "sentimentScore": 80.8,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 1750,
        "avgMentions": 641,
        "diff": 349,
        "sentimentScore": 70.2,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 478,
        "avgMentions": 768,
        "diff": 47,
        "sentimentScore": 98.4,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "깨끗한 시설",
        "category": "일반",
        "mentions": 1679,
        "avgMentions": 83,
        "diff": 67,
        "sentimentScore": 96,
        "description": "깨끗한 시설에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "전문성",
        "category": "일반",
        "mentions": 564,
        "avgMentions": 510,
        "diff": 81,
        "sentimentScore": 88.1,
        "description": "전문성에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 452,
        "avgMentions": 462,
        "diff": 24,
        "sentimentScore": 43.6,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 646,
        "avgMentions": 318,
        "diff": 47,
        "sentimentScore": 23.2,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 308,
        "avgMentions": 21,
        "diff": 21,
        "sentimentScore": 36.1,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 646,
        "avgMentions": 318,
        "diff": 26,
        "sentimentScore": 46.6,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 913,
        "avgMentions": 95,
        "diff": 30,
        "sentimentScore": 42.3,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 42.1,
      "satisfaction": 67.1
    },
    "improvementActions": [
      "대기 공간 편의시설 확충",
      "온라인 예약 시스템 도입",
      "첫 방문 고객 대상 안내 프로세스 개선",
      "주차 및 접근성 안내 강화"
    ]
  },
  {
    "id": "h19",
    "name": "장안숨이비인후과",
    "city": "수원시",
    "district": "권선구",
    "department": "피부과",
    "reviewCount": 6244,
    "totalScore": 67.1,
    "districtRank": 18,
    "districtTotal": 93,
    "cityRank": 22,
    "cityTotal": 324,
    "positiveRate": 80.4,
    "negativeRate": 23.6,
    "status": "과잉가능",
    "statusDescription": "장안숨이비인후과은 과잉가능 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 53.3,
        "marketAvg": 54.3,
        "top10Avg": 58.8
      },
      {
        "name": "증상/처방/수액",
        "score": 96.1,
        "marketAvg": 79.6,
        "top10Avg": 102.6
      },
      {
        "name": "상담/설명/신뢰",
        "score": 94,
        "marketAvg": 85.1,
        "top10Avg": 101.6
      },
      {
        "name": "친절/응대",
        "score": 60.5,
        "marketAvg": 53.9,
        "top10Avg": 68.3
      },
      {
        "name": "예약/대기/운영",
        "score": 79.6,
        "marketAvg": 85.8,
        "top10Avg": 79.8
      },
      {
        "name": "비용/시설/접근성",
        "score": 60.9,
        "marketAvg": 57.7,
        "top10Avg": 68.5
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 1484,
        "avgMentions": 772,
        "diff": 187,
        "sentimentScore": 73.7,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "현대적 장비",
        "category": "일반",
        "mentions": 1307,
        "avgMentions": 872,
        "diff": 206,
        "sentimentScore": 95.9,
        "description": "현대적 장비에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 623,
        "avgMentions": 109,
        "diff": 167,
        "sentimentScore": 73,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 343,
        "avgMentions": 659,
        "diff": 484,
        "sentimentScore": 70.7,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "빠른 진료",
        "category": "일반",
        "mentions": 1558,
        "avgMentions": 706,
        "diff": 395,
        "sentimentScore": 87,
        "description": "빠른 진료에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 287,
        "avgMentions": 168,
        "diff": 57,
        "sentimentScore": 40.6,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "설명 부족",
        "category": "일반",
        "mentions": 212,
        "avgMentions": 73,
        "diff": 102,
        "sentimentScore": 38.3,
        "description": "설명 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 519,
        "avgMentions": 311,
        "diff": 45,
        "sentimentScore": 41,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 793,
        "avgMentions": 408,
        "diff": 96,
        "sentimentScore": 31.8,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 302,
        "avgMentions": 206,
        "diff": 47,
        "sentimentScore": 25.2,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 49.8,
      "satisfaction": 67.1
    },
    "improvementActions": [
      "온라인 예약 시스템 도입",
      "첫 방문 고객 대상 안내 프로세스 개선",
      "대기 공간 편의시설 확충",
      "예약 시간대별 대기시간 안내"
    ]
  },
  {
    "id": "h7",
    "name": "연세뉴하트내과의원",
    "city": "수원시",
    "district": "권선구",
    "department": "내과",
    "reviewCount": 10489,
    "totalScore": 65.3,
    "districtRank": 19,
    "districtTotal": 89,
    "cityRank": 22,
    "cityTotal": 351,
    "positiveRate": 65.8,
    "negativeRate": 20.3,
    "status": "과잉가능",
    "statusDescription": "연세뉴하트내과의원은 과잉가능 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 87.4,
        "marketAvg": 97,
        "top10Avg": 97.6
      },
      {
        "name": "증상/처방/수액",
        "score": 73.7,
        "marketAvg": 79.4,
        "top10Avg": 87.7
      },
      {
        "name": "상담/설명/신뢰",
        "score": 65.5,
        "marketAvg": 50.6,
        "top10Avg": 73.3
      },
      {
        "name": "친절/응대",
        "score": 81.3,
        "marketAvg": 76.5,
        "top10Avg": 83.5
      },
      {
        "name": "예약/대기/운영",
        "score": 92.5,
        "marketAvg": 86.7,
        "top10Avg": 95.5
      },
      {
        "name": "비용/시설/접근성",
        "score": 82.9,
        "marketAvg": 77.8,
        "top10Avg": 96.5
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "상세한 설명",
        "category": "일반",
        "mentions": 542,
        "avgMentions": 607,
        "diff": 110,
        "sentimentScore": 90.5,
        "description": "상세한 설명에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 903,
        "avgMentions": 977,
        "diff": 51,
        "sentimentScore": 96.6,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "현대적 장비",
        "category": "일반",
        "mentions": 159,
        "avgMentions": 543,
        "diff": 56,
        "sentimentScore": 74.9,
        "description": "현대적 장비에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "재방문 의사",
        "category": "일반",
        "mentions": 971,
        "avgMentions": 434,
        "diff": 170,
        "sentimentScore": 95.1,
        "description": "재방문 의사에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 212,
        "avgMentions": 811,
        "diff": 119,
        "sentimentScore": 86.2,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 733,
        "avgMentions": 207,
        "diff": 133,
        "sentimentScore": 49.9,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 535,
        "avgMentions": 125,
        "diff": 94,
        "sentimentScore": 24.6,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "과잉진료 의심",
        "category": "일반",
        "mentions": 923,
        "avgMentions": 474,
        "diff": 73,
        "sentimentScore": 49.7,
        "description": "과잉진료 의심에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 785,
        "avgMentions": 410,
        "diff": 165,
        "sentimentScore": 25.4,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "접수 혼잡",
        "category": "일반",
        "mentions": 361,
        "avgMentions": 158,
        "diff": 25,
        "sentimentScore": 32.3,
        "description": "접수 혼잡에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 79.5,
      "satisfaction": 65.3
    },
    "improvementActions": [
      "온라인 예약 시스템 도입",
      "주차 및 접근성 안내 강화",
      "진료비 사전 안내 체계 도입",
      "첫 방문 고객 대상 안내 프로세스 개선"
    ]
  },
  {
    "id": "h12",
    "name": "김지범내과의원",
    "city": "수원시",
    "district": "장안구",
    "department": "내과",
    "reviewCount": 8470,
    "totalScore": 65.3,
    "districtRank": 20,
    "districtTotal": 70,
    "cityRank": 23,
    "cityTotal": 478,
    "positiveRate": 89.4,
    "negativeRate": 12.8,
    "status": "집중개선",
    "statusDescription": "김지범내과의원은 집중개선 영역에 위치합니다.",
    "categoryScores": [
      {
        "name": "검진/검사/내시경",
        "score": 81.2,
        "marketAvg": 65.7,
        "top10Avg": 94.5
      },
      {
        "name": "증상/처방/수액",
        "score": 75.6,
        "marketAvg": 73.6,
        "top10Avg": 89.4
      },
      {
        "name": "상담/설명/신뢰",
        "score": 92.9,
        "marketAvg": 74.5,
        "top10Avg": 102.2
      },
      {
        "name": "친절/응대",
        "score": 70.3,
        "marketAvg": 57.5,
        "top10Avg": 83.3
      },
      {
        "name": "예약/대기/운영",
        "score": 87.3,
        "marketAvg": 68.9,
        "top10Avg": 93.5
      },
      {
        "name": "비용/시설/접근성",
        "score": 93.6,
        "marketAvg": 80.2,
        "top10Avg": 99.1
      }
    ],
    "positiveKeywords": [
      {
        "rank": 1,
        "name": "대중교통 접근",
        "category": "일반",
        "mentions": 970,
        "avgMentions": 936,
        "diff": 264,
        "sentimentScore": 86.9,
        "description": "대중교통 접근에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 2,
        "name": "친절함",
        "category": "일반",
        "mentions": 1886,
        "avgMentions": 205,
        "diff": 332,
        "sentimentScore": 92.4,
        "description": "친절함에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 3,
        "name": "주차 편리",
        "category": "일반",
        "mentions": 1198,
        "avgMentions": 948,
        "diff": 277,
        "sentimentScore": 85.1,
        "description": "주차 편리에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 4,
        "name": "따뜻한 분위기",
        "category": "일반",
        "mentions": 1854,
        "avgMentions": 183,
        "diff": 106,
        "sentimentScore": 95.6,
        "description": "따뜻한 분위기에 대한 긍정적 언급이 많습니다."
      },
      {
        "rank": 5,
        "name": "정확한 진단",
        "category": "일반",
        "mentions": 1116,
        "avgMentions": 830,
        "diff": 412,
        "sentimentScore": 94.3,
        "description": "정확한 진단에 대한 긍정적 언급이 많습니다."
      }
    ],
    "negativeKeywords": [
      {
        "rank": 1,
        "name": "긴 대기시간",
        "category": "일반",
        "mentions": 478,
        "avgMentions": 88,
        "diff": 77,
        "sentimentScore": 47.6,
        "description": "긴 대기시간에 대한 불만이 확인됩니다."
      },
      {
        "rank": 2,
        "name": "예약 어려움",
        "category": "일반",
        "mentions": 467,
        "avgMentions": 411,
        "diff": 183,
        "sentimentScore": 44.3,
        "description": "예약 어려움에 대한 불만이 확인됩니다."
      },
      {
        "rank": 3,
        "name": "비싼 비용",
        "category": "일반",
        "mentions": 67,
        "avgMentions": 420,
        "diff": 145,
        "sentimentScore": 48.1,
        "description": "비싼 비용에 대한 불만이 확인됩니다."
      },
      {
        "rank": 4,
        "name": "주차 부족",
        "category": "일반",
        "mentions": 70,
        "avgMentions": 75,
        "diff": 192,
        "sentimentScore": 25.3,
        "description": "주차 부족에 대한 불만이 확인됩니다."
      },
      {
        "rank": 5,
        "name": "불친절한 직원",
        "category": "일반",
        "mentions": 966,
        "avgMentions": 355,
        "diff": 125,
        "sentimentScore": 41.1,
        "description": "불친절한 직원에 대한 불만이 확인됩니다."
      }
    ],
    "position": {
      "importance": 63.5,
      "satisfaction": 65.3
    },
    "improvementActions": [
      "예약 시간대별 대기시간 안내",
      "주차 및 접근성 안내 강화",
      "비급여 진료 항목별 세부 안내표 제공",
      "건강검진 패키지 안내 강화"
    ]
  }
];
