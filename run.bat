@echo off
cd /d D:\WebApps\opsapp
echo Starting SRWB Operations Dashboard...
:loop
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
echo Server stopped. Restarting in 5 seconds...
timeout /t 5 /nobreak >nul
goto loop