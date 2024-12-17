@echo off
set IMAGE_NAME=react-backend
set DOCKERFILE_PATH=Dockerfile.Run
set CONTAINER_NAME=react-Api

:: Check if the image already exists and remove it if necessary
docker images | findstr "%IMAGE_NAME%" >nul
if %errorlevel%==0 (
    docker rmi -f %IMAGE_NAME%
)

:: Build the Docker image
docker build -f %DOCKERFILE_PATH% -t %IMAGE_NAME% .

:: Run the Docker container
docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%

:: Output the URL for the backend
echo Backend started at http://localhost:3000
