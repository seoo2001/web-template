import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import test

# FastAPI 앱 생성
app = FastAPI(
    title="RDBMS to Knowledge Graph API",
    description="엑셀 파일을 통한 데이터베이스 스키마 매핑 및 지식 그래프 변환 도구",
    version="1.0.0"
)

# CORS 미들웨어 추가 (프론트엔드 연결용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js 기본 포트
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우터 등록
app.include_router(test.router, prefix="/api/v1/test", tags=["test"])

@app.get("/")
async def root():
    """
    루트 엔드포인트
    """
    return {
        "message": "RDBMS to Knowledge Graph API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)