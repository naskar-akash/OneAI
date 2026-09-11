import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(cookieParser())
app.use("/auth", proxy(process.env.AUTH_SERVICE))


app.get('/', (req, res) => {
  res.send('Hello World from gateway!')
})

app.listen(port, () => {
  console.log(`Gateway started on port ${port}`)
})