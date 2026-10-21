import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "../billing/config/db.js"
// import authRoutes from "./routes/auth.route.js";

const port = process.env.PORT
const app = express()
app.use(express.json());

// app.use("/", authRoutes)

app.get('/', (req, res) => {
  res.send('Hello from Billing!')
})

app.listen(port, () => {
  console.log(`Billing started on port ${port}`)
  connectDB()
})