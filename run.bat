@echo off
title Nexus Tech - E-Commerce Web App
echo ========================================================
echo        Starting Nexus Tech E-Commerce Website...
echo ========================================================
echo.

:: Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not found in your PATH!
    echo Please make sure Python is installed.
    pause
    exit /b
)

:: Run database migration
echo [1/3] Checking database...
python manage.py migrate --no-input

:: Open browser automatically after 2 seconds
echo [2/3] Opening browser at http://127.0.0.1:8000/ ...
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:8000/"

:: Start Django server
echo [3/3] Starting Django server...
echo.
echo ========================================================
echo   Server is running! 
echo   Website: http://127.0.0.1:8000/
echo   Admin:   http://127.0.0.1:8000/admin (admin / admin123)
echo   Press Ctrl+C in this window to stop the server.
echo ========================================================
python manage.py runserver 8000

pause
