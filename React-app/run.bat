@echo off
set IMAGE_NAME=react-app
set DOCKERFILE_PATH=Dockerfile.Run
set CONTAINER_NAME=react-Web

npm run build

docker images | findstr "%IMAGE_NAME%" >nul
if %errorlevel%==0 (
    docker rmi -f %IMAGE_NAME%
)

docker build -f %DOCKERFILE_PATH% -t %IMAGE_NAME% .

docker run -d -p 3001:80 --name %CONTAINER_NAME% %IMAGE_NAME%

echo React Start http://localhost:3001/
