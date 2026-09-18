import express from "express";
import dotenv from "dotenv";
import connectDB from "../auth/config/db.js"
import router from "./routes/agent.route.js";

dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json());
app.use("/", router)

app.get('/', (req, res) => {
  res.send('Agent started!')
})

app.listen(port, () => {
  console.log(`Agent started on port ${port}`)
  connectDB()
})