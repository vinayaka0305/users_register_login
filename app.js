const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes')

app.use(express.json());


app.use("/api/v1/user",userRoutes);


module.exports = app;

