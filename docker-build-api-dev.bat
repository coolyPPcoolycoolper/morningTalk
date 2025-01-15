@echo off
set IMAGE_NAME=react-backend
set DOCKERFILE_PATH=./Backend/Dockerfile
set TAG=ghcr.io/coolyppcoolycoolper/morningtalk/morning-api:dev

echo Building Docker image...
docker build -f %DOCKERFILE_PATH% -t %IMAGE_NAME% .
if %ERRORLEVEL% neq 0 (
    echo Failed to build Docker image.
    pause
    exit /b 1
)

echo Tagging Docker image...
docker tag %IMAGE_NAME% %TAG%
if %ERRORLEVEL% neq 0 (
    echo Failed to tag Docker image.
    pause
    exit /b 1
)

echo Logging into GitHub Container Registry...
echo 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 | docker login ghcr.io -u coolyPPcoolycoolper --password-stdin
if %ERRORLEVEL% neq 0 (
    echo Failed to log in to GitHub Container Registry.
    pause
    exit /b 1
)

echo Pushing Docker image to GHCR...
docker push %TAG%
if %ERRORLEVEL% neq 0 (
    echo Failed to push Docker image.
    pause
    exit /b 1
)

echo Docker image pushed successfully.
pause
