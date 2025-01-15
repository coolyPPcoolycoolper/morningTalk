@echo off
set IMAGE_NAME=react-app
set DOCKERFILE_PATH=./React-app/Dockerfile
set TAG=ghcr.io/coolyppcoolycoolper/morningtalk/morning-web:local

docker build -f %DOCKERFILE_PATH% -t %IMAGE_NAME% .
docker tag %IMAGE_NAME% %TAG%
echo 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 | docker login ghcr.io -u coolyPPcoolycoolper --password-stdin
docker push %TAG%
pause
