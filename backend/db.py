import sqlite3
import os

# DB 파일 절대 경로 설정
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'DB', 'vital_hospital_reviews.db')

def get_db_connection():
    """
    SQLite 데이터베이스 커넥션을 반환합니다.
    row_factory를 sqlite3.Row로 설정하여 딕셔너리 형태로 결과에 접근할 수 있게 합니다.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
