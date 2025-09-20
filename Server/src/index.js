import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();


const app = express()
const PORT = process.env.PORT || 5000

   app.use(cors()) 


app.use(express.json())
// app.use(rateLimiter)

// routing
app.use("/api/notes",notesRoutes)



// mongodb and server
connectDB().then (()=>{
    app.listen(PORT,()=>{
    console.log("server running in PORT:", PORT)
})
})

