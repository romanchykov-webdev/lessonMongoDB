const express = require('express');
const mongoose = require('mongoose');

// Import model
const Movie = require('./models/movie');

// Import route
const movieRoutes = require("./routes/movie-routs");

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGODB_URI || 'mongodb+srv://romanchykovwebdev:jbMb5rYjzjRtq4FV@muvies.ppp8dzo.mongodb.net/movibox?retryWrites=true&w=majority&appName=muvies';

const app = express();
app.use(express.json());
app.use(movieRoutes);

console.log('Connecting to MongoDB URL:', URL);  // Добавлено логирование URL

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('DB connection error:', err));  // Использование console.error для логирования ошибок

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', err => {
    console.error('Server startup error:', err);
});
