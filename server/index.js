const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const route = require('./routes/userRoute')
const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 7000

const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
    console.log("DB connected succesfully!!!")
}).catch((error)=>{
    console.log(error)
})

app.use("/api",route);

app.listen(port , ()=>{
    console.log("server is running on : ", port)
})