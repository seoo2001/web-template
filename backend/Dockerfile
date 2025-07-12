FROM python:3.11-slim

WORKDIR /app

# pyproject.toml과 uv.lock만 먼저 복사 (layer cache 유지를 위해)
COPY pyproject.toml uv.lock ./

# uv 설치
RUN pip install uv

# 종속성 설치 (정확히 lock된 버전으로)
RUN uv sync

# 이후 실제 코드 복사
COPY . .

EXPOSE 8000

CMD ["uv", "run", "main.py"]