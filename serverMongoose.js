const express = require('express');
const mongoose = require('mongoose');

//import model
const Movie = require('./models/movie');

const PORT = 3000;
const URL = 'mongodb://localhost:27017/movibox';


const app = express();
app.use(express.json());

// fun error
const handleError = (res, error) => {
    res.status(500).json({error})
}

mongoose
    .connect(URL)
    .then(() => console.log('connect to MongoDB'))
    .catch((err) => console.log('DB connect err: ', err))

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log('Server running on port', PORT);
})

// get all items
app.get('/movies', (req, res) => {
    Movie
        .find()
        .sort({title: 1})
        .then((allMovies) => {
            res
                .status(200)
                .json(allMovies)
        })
        .catch(()=>handleError(res,'Something goes wrong...'))
})
//get one item
app.get('/movies/:id', (req, res) => {
    Movie
        .findById(req.params.id)
        .then((item) => {
            res
                .status(200)
                .json(item)
        })
        .catch(()=>handleError(res,'Something goes wrong...'))
})

//delete item
app.delete('/movies/:id', (req, res) => {
    Movie
        .findOneAndDelete({_id: req.params.id})
        .then((result) => {
            res
                .status(200)
                .json(result)
        })
        .catch(()=>handleError(res,'Something goes wrong...'))
})

// Add item
app.post('/movies', (req, res) => {
    const movie = new Movie(req.body)
    movie
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result)
        })
        .catch(()=>handleError(res,'Something goes wrong...'))
})

//Update one item
app.patch('movies/:id', (req, res) => {
    Movie
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result)=>{
            res
                .status(200)
                .json(result)
        })
        .catch(()=>handleError(res,'Something goes wrong...'))

})

//Update one item
app.patch('/movies/:id', (req, res) => {
    Movie
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result)=>{
            res
                .status(200)
                .json(result)
        })
        .catch(()=>handleError(res,'Something goes wrong...'))
})