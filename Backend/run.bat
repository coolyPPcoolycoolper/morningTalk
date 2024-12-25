@echo off
:: Set variables
set IMAGE_NAME=react-backend
set DOCKERFILE_PATH=Dockerfile.Run
set CONTAINER_NAME=react-Api
set TAG=ghcr.io/coolyppcoolycoolper/morningtalk/morning-api:dev
set LOCAL_PORT=3000
set CONTAINER_PORT=3000

:: Pull the Docker image from the registry
echo Pulling Docker image: %TAG%...
docker pull %TAG%
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to pull Docker image: %TAG%
    pause
    exit /b 1
)

:: Check if the container already exists and remove it if necessary
echo Stopping and removing existing container if it exists...
docker ps -a | findstr "%CONTAINER_NAME%" >nul
if %ERRORLEVEL%==0 (
    docker stop %CONTAINER_NAME% >nul
    docker rm %CONTAINER_NAME% >nul
)

:: Run the Docker container
echo Running Docker container...
docker run -d -p %LOCAL_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %TAG%
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to run Docker container: %CONTAINER_NAME%
    pause
    exit /b 1
)

:: Output success message with backend URL
echo Backend started successfully at http://localhost:%LOCAL_PORT%/
pause