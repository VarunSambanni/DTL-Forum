const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env);
const app = express();

const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routes);

mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
        console.log("Connected to database");
        app.listen(5000, () => {
            console.log("Server listening on port 5000...");
        })
    })
    .catch(err => {
        console.log("Database connection error => ", err);
    })