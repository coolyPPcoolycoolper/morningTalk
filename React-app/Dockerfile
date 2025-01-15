FROM node:16
WORKDIR /app
COPY package*.json ./
COPY ./React-app ./
# RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "start"]
