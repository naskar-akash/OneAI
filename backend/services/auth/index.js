import express from "express";
import dotenv from "dotenv";
import connectDB from "../auth/config/db.js"

dotenv.config()

const app = express()
const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello from auth!')
})

app.listen(port, () => {
  console.log(`Auth started on port ${port}`)
  connectDB()
})