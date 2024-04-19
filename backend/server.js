import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// deploy
import path from "path"

import authRoutes from "./routes/auth-routes.js";
import messageRoutes from "./routes/message-routes.js";
import userRoutes from "./routes/user-routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from "./socket/socket.js";

// const app = express();
const PORT = process.env.PORT || 5000;

// deploy
const __dirname=path.resolve(); // dirname ye3ni root


dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// deploy
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
