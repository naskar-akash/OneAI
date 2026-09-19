import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js"
import router from "./routes/chat.route.js";


const port = process.env.PORT
const app = express()
app.use(express.json());


app.use("/", router)

app.get('/', (req, res) => {
  res.send('Chat started!')
})

app.listen(port, () => {
  console.log(`Chat started on port ${port}`)
  connectDB()
})