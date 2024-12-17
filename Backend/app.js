const express = require('express');
const https = require('https');
const fs = require('fs');
const config = require('./config');
const morningTalkRoutes = require('./routes/morningTalk');
const cors = require('cors');

const app = express();

// Load SSL certificates
const httpsOptions = {
    key: fs.readFileSync('./key.pem'), // Replace with your key file path
    cert: fs.readFileSync('./cert.pem') // Replace with your cert file path
};

// Configure CORS
const corsOptions = {
    origin: config.origin, // อนุญาตเฉพาะ origin นี้
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,Cache-Control',
    credentials: true, // ถ้าต้องการส่ง cookie หรือข้อมูลรับรอง
};

app.use(cors(corsOptions));
app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/morningTalk', morningTalkRoutes);

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

// Create HTTPS server
https.createServer(httpsOptions, app).listen(config.port, () => {
    console.log(`HTTPS Server running at https://localhost:${config.port}`);
});
