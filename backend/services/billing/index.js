import express from "express";
import dotenv from "dotenv";
dotenv.config()
import connectDB from "./config/db.js"
import router from "./routes/billing.routes.js";

const port = process.env.PORT
const app = express()
app.use(express.json());

app.use("/", router)

app.get('/', (req, res) => {
  res.send('Hello from Billing!')
})

app.listen(port, () => {
  console.log(`Billing started on port ${port}`)
  connectDB()
})