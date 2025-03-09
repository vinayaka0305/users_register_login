const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes')
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use("/api/v1/user",userRoutes);


module.exports = app;

