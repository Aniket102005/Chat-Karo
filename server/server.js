import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app)

//Intialize socket.io server
export const io = new Server(server,{
    cors:{origin:"*"}
})

//Middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.use("/api/status",(req,res)=>res.send("Server is live"));
//Routes setup
app.use("/api/auth",userRouter)
app.use("api/messages",messageRouter);

//Connect to MongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log("Server is running on PORT: "+PORT));
