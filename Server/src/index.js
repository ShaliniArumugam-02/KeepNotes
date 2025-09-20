import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();


const app = express()
const PORT = process.env.PORT || 5000;
const __dirname =path.resolve()
if(process.env.NODE_ENV !== "production") {
      app.use(cors({
  origin: "http://localhost:5174"
}));
}



app.use(express.json())
// app.use(rateLimiter)

// routing
app.use("/api/notes",notesRoutes)

if(process.env.NODE_ENV=== "production") {
    app.use(express.static(path.join(__dirname,"../Client/dist")));
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname,"../Client", "dist","index.html"))
})
}



// mongodb and server
connectDB().then (()=>{
    app.listen(PORT,()=>{
    console.log("server running in PORT:", PORT)
})
})

