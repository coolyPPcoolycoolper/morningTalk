@echo off
:: Set variables
set IMAGE_NAME=react-backend
set CONTAINER_NAME=react-Api
set TAG=ghcr.io/coolyppcoolycoolper/morningtalk/morning-api:local
set LOCAL_PORT=3000
set CONTAINER_PORT=3000

:: Login to GHCR
echo Logging in to GitHub Container Registry...
echo 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 | docker login ghcr.io -u coolyPPcoolycoolper --password-stdin
if %ERRORLEVEL% neq 0 (
    echo Login failed. Please check your credentials.
    pause
    exit /b 1
)

:: Pull the Docker image from the registry
echo Pulling Docker image: %TAG%...
docker pull %TAG%
if %ERRORLEVEL% neq 0 (
    echo Failed to pull Docker image. Please check the TAG or network connection.
    pause
    exit /b 1
)

:: Stop and remove any existing container with the same name
echo Stopping any existing container with name: %CONTAINER_NAME%...
docker stop %CONTAINER_NAME% >nul 2>&1
docker rm %CONTAINER_NAME% >nul 2>&1

:: Run the Docker container
echo Running Docker container...
docker run -d -p %LOCAL_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %TAG%
if %ERRORLEVEL% neq 0 (
    echo Failed to run the Docker container. Please check the image or port settings.
    pause
    exit /b 1
)

:: Output success message with backend URL
echo Backend started successfully at http://localhost:%LOCAL_PORT%/
pause
