const express = require('express');
const mongoose = require('mongoose');

//import model
const Movie = require('./models/movie');

//import rout
const movieRoutes = require("./routes/movie-routs");

const PORT = 3000;
// const URL = 'mongodb://localhost:27017/movibox';
const URL = 'mongodb+srv://romanchykovwebdev:jbMb5rYjzjRtq4FV@muvies.ppp8dzo.mongodb.net/?retryWrites=true&w=majority&appName=muvies';


const app = express();
app.use(express.json());
app.use(movieRoutes)


mongoose
    .connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connect to MongoDB'))
    .catch((err) => console.log('DB connect err: ', err))

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server running on port', PORT);
})

// time 2:08:51