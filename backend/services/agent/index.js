import express from "express";
import dotenv from "dotenv";
import connectDB from "../agent/config/db.js";
import router from "./routes/agent.route.js";

dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json());
app.use("/", router)
 // To send  error at every time when index.js of agent service runs
app.use((err, req, res, next) => {
  console.log(err)                       
  if (err?.status){
    return res.status(err?.status).json({ message: err?.data })
  }
   return res.status(500).json({ message: `Agent error: ${err}` });
})

app.get('/', (req, res) => {
  res.send('Agent started!')
})

app.listen(port, () => {
  console.log(`Agent started on port ${port}`)
  connectDB()
})