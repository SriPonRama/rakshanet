@echo off
echo Starting RakshaNet - Smart Disaster Response Platform
echo.

echo [1/3] Starting MongoDB...
start "MongoDB" cmd /k "mongod"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Starting AI Microservice...
start "AI Service" cmd /k "cd ai-service && python app.py"
timeout /t 3 /nobreak >nul

echo [4/4] Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo All services started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo AI Service: http://localhost:8000
echo.
pause
