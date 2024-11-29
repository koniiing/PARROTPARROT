@echo off
REM React 빌드
cd client
echo React 빌드 중...
npm run build
if errorlevel 1 (
    echo React 빌드 실패
    exit /b 1
)
cd ..

REM 빌드 파일 복사
echo 빌드 파일 복사 중...
xcopy /E /I client\build\* server\static\

REM Flask 서버 실행
cd server
echo Flask 서버 실행 중...
python application.py
