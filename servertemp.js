const express = require('express');
const mongoose = require('mongoose');

// Import model
const Movie = require('./models/movie');

// Import route (check the correct file name here)
const movieRoutes = require("./routes/movie-routes");

const PORT =3000;  // Added defaulting to an environment variable for flexibility
const URL = 'mongodb+srv://romanchykovwebdev:jbMb5rYjzjRtq4FV@muvies.ppp8dzo.mongodb.net/movibox?retryWrites=true&w=majority&appName=muvies';  // Use environment variable to secure sensitive data

const app = express();
app.use(express.json());
app.use(movieRoutes);

mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('DB connection error: ', err));  // Use console.error for better error visibility

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', err => {
    console.error('Server startup error:', err);
});
