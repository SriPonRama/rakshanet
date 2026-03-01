@echo off
echo Building RakshaNet for deployment...
echo.

echo [1/3] Building frontend...
cd frontend
call npm install
call npm run build
cd ..

echo [2/3] Copying frontend build to backend...
xcopy /E /I /Y "frontend\dist" "backend\dist"

echo [3/3] Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo ✓ Build complete!
echo.
echo Now deploy the 'backend' folder to Render/Railway
echo The backend will serve the frontend automatically
pause
