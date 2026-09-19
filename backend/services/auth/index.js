import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "../auth/config/db.js"
import authRoutes from "./routes/auth.route.js";


const port = process.env.PORT
const app = express()
app.use(express.json());

app.use("/", authRoutes)

app.get('/', (req, res) => {
  res.send('Hello from auth!')
})

app.listen(port, () => {
  console.log(`Auth started on port ${port}`)
  connectDB()
})