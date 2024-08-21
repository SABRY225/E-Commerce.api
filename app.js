const express = require('express');
const connectDB = require('./config/db');
const swaggerSpec = require('./swagger/swaggerConfig');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config(); // تحميل متغيرات البيئة

const { app, server } = require('./Socket/socket');

// استخدام متغير baseUrl من البيئة
const baseUrl = 'e-commerceapi-production-0f8f.up.railway.app'; 

// إعدادات CORS
const allowedOrigins = [process.env.BASE_URL];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions)); // استخدم خيارات CORS

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
