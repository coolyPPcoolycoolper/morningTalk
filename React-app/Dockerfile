# ใช้ Node.js image สำหรับการติดตั้ง dependencies และสร้างแอป
FROM node:18-alpine as build

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json เพื่อการติดตั้ง dependencies
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# สร้างแอป React
RUN npm run build

# ใช้ Nginx image สำหรับ production
FROM nginx:alpine

# คัดลอก build output ไปที่ default directory ของ nginx
COPY --from=build /app/build /usr/share/nginx/html

# เปิดพอร์ต 80
EXPOSE 80

# รัน nginx
CMD ["nginx", "-g", "daemon off;"]