from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# 데이터베이스 URL 설정
DB_URL = (
    f"mysql+pymysql://test_user:test_password@mysql:3306/test_db"
)

# 환경변수로 오버라이드 가능하도록 설정
DB_URL = os.getenv("DATABASE_URL", DB_URL)

# SQLAlchemy 엔진 생성
engine = create_engine(
    DB_URL,
    pool_pre_ping=True,  # 연결 상태 확인
    pool_recycle=3600,   # 1시간마다 연결 재생성
    echo=True            # SQL 쿼리 로깅 (개발 환경에서만)
)

# 세션 로컬 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base 클래스 생성
Base = declarative_base()

# 데이터베이스 세션 의존성
def get_db():
    """
    데이터베이스 세션을 생성하고 반환합니다.
    FastAPI 의존성 주입에서 사용됩니다.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
