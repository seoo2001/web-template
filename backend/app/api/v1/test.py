from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health_check():
    """
    기본 헬스 체크 엔드포인트
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "message": "API가 정상적으로 작동 중입니다."
    }

@router.get("/db-test")
async def database_test(db: Session = Depends(get_db)):
    """
    데이터베이스 연결 테스트 엔드포인트
    """
    try:
        # 간단한 쿼리로 DB 연결 테스트
        result = db.execute(text("SELECT 1 as test_value"))
        test_value = result.scalar()
        
        return {
            "status": "success",
            "message": "데이터베이스 연결이 성공적으로 이루어졌습니다.",
            "test_value": test_value,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"데이터베이스 연결 실패: {str(e)}"
        )

@router.get("/version")
async def get_version():
    """
    API 버전 정보
    """
    return {
        "version": "1.0.0",
        "api_name": "RDBMS to Knowledge Graph API",
        "description": "엑셀 파일을 통한 데이터베이스 스키마 매핑 도구",
        "timestamp": datetime.now().isoformat()
    } 