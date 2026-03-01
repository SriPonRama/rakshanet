@echo off
echo Building frontend...
cd frontend
call npm run build
cd ..

echo Frontend built successfully!
echo.
echo Deploy to Render:
echo 1. Push to GitHub
echo 2. Create Web Service on Render
echo 3. Root Directory: backend
echo 4. Build Command: cd ../frontend && npm install && npm run build && cd ../backend && npm install
echo 5. Start Command: npm start
echo 6. Add environment variables
echo.
pause
