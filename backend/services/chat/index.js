import express from "express";
import dotenv from "dotenv";
import connectDB from "../auth/config/db.js"

dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Chat started!')
})

app.listen(port, () => {
  console.log(`Chat started on port ${port}`)
  connectDB()
})