const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const projectRoutes = require("./routes/Project");

const database = require('./config/database');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? [
            'https://code-bridge-git-main-hardik-sharmas-projects-03c0716d.vercel.app', 
            'https://code-bridge-mg1img3sa-hardik-sharmas-projects-03c0716d.vercel.app',
            'https://code-bridge-56r3him1x-hardik-sharmas-projects-03c0716d.vercel.app' 
          ]
        : "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/project", projectRoutes);

app.get("/api/v1/health", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

// Handle production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        return res.json({
            success: true,
            message: 'Your server is up and running in development mode....'
        });
    });
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const server = app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});


process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;