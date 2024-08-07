const express = require("express")
const connectDb = require("./config/db")
require("dotenv").config()
const router = require('./routes/route')
const cors = require("cors")
const helmet = require("helmet")
const app = express()
const Port = process.env.PORT || 8080

connectDb()
app.use(helmet())
app.use(helmet.referrerPolicy({policy: 'strict-origin-when-cross-origin'}))

const corsOptions = {
    origin: 'http://localhost:3002',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json())
app.use("/api", router)
app.get('/', (req, res) => {
  res.send('Hello');
});
app.listen(Port, ()=> {
    console.log(`Listeing at ${Port}` )
})