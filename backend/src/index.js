import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.Route.js";
import messageRoutes from "./routes/message.Route.js";
import {app,server} from "./lib/socket.js";
dotenv.config();
// const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin:"https://chat-app-oqrm.onrender.com",
     credentials:true
}));
const PORT=process.env.PORT;

const _dirname=path.resolve();
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")));

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT,()=>{
    console.log("Server is running on PORT:"+PORT);
    connectDB();
});