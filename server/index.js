const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const route = require('./routes/userRoute');
const app = express();
require('./config/db'); // just to trigger connection logging

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 7000;

app.use("/api/v1/users", route);

app.listen(port, () => {
  console.log("Server is running on:", port);
});
