FROM node:16

# ตั้งค่า working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# คัดลอกไฟล์ทั้งหมดในโฟลเดอร์ Local ไปยัง container
COPY ./Backend/package*.json ./
COPY ./Backend/app.js ./
COPY ./Backend ./

# เปิดพอร์ตสำหรับแอปพลิเคชัน
EXPOSE 3000

# กำหนด entry point
CMD ["node", "app.js"]
