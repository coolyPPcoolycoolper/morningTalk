@echo off
:: ตั้งค่า variables
set TAG=ghcr.io/coolyppcoolycoolper/morningtalk/morning-web:dev
set CONTAINER_NAME=react-Web
set LOCAL_PORT=3001
set CONTAINER_PORT=3000

echo Pulling Docker image...
docker pull %TAG%
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to pull image: %TAG%
    pause
    exit /b 1
)

echo Stopping and removing any existing container with the same name...
docker stop %CONTAINER_NAME% 2>nul
docker rm %CONTAINER_NAME% 2>nul

echo Running Docker container...
docker run -d -p %LOCAL_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %TAG%
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to run container: %CONTAINER_NAME%
    pause
    exit /b 1
)

echo Checking container status...
docker ps | findstr %CONTAINER_NAME%
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Container %CONTAINER_NAME% is not running.
    pause
    exit /b 1
)

echo React app should be running at: http://localhost:%LOCAL_PORT%/
pause
