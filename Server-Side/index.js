import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/adminRouter.js";
import { collectorRouter } from "./Routes/collectorRouter.js"; // changed
import { collectionRouter } from "./Routes/collectionRouter.js";

import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

// CORS setup
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('Public'));

// Routes
app.use('/auth', adminRouter);       // Admin routes
app.use('/collector', collectorRouter);  // Collector routes
app.use("/collection", collectionRouter);

// JWT verification middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if(err) return res.json({Status: false, Error: "Invalid Token"});
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.json({Status: false, Error: "Not authenticated"});
    }
};

// Example verify endpoint
app.get('/verify', verifyUser, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id});
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
