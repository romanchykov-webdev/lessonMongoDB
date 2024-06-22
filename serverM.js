const express = require('express');
const {connectToDb, getDb} = require('./tempdb')
const {ObjectId} = require("mongodb");


const PORT = 3000;

const app = express();
app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {

        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log('Server running on port', PORT);
        })
        db = getDb();
    } else {
        console.log('DB connect err: ', err)
    }
})
// fun error
const handleError = (res, error) => {
    res.status(500).json({error})
}

app.get('/movies', (req, res) => {
    const movies = [];
    db
        .collection('movies')
        .find()
        .sort({title: 1})
        .forEach((item) => movies.push(item))
        .then(() => {
            res
                .status(200)
                .json(movies)
        })
        .catch(() => handleError(res, "Something goes wrong..."));
})


app.get('/movies/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        const movieId = new ObjectId(req.params.id);
        db
            .collection('movies')
            .findOne({_id: movieId})
            .then((doc) => {
                res
                    .status(200)
                    .json(doc)
            })
            .catch(() => handleError(res, "Something goes wrong..."))
    } else {
        handleError(res, "Wring id")
    }


})


app.delete('/movies/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        const movieId = new ObjectId(req.params.id);
        db
            .collection('movies')
            .deleteOne({_id: movieId})
            .then((result) => {
                res
                    .status(200)
                    .json(result)
            })
            .catch(() => handleError(res, "Something goes wrong..."))
    } else {
        handleError(res, "Wring id")
    }


})

//add item to db
app.post('/movies', (req, res) => {
    db
        .collection('movies')
        .insertOne(req.body)
        .then((result) => {
            res
                .status(201)
                .json(result)
        })
        .catch(() => handleError(res, "Something goes wrong..."))
})

//update item
app.patch('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const movieId = new ObjectId(req.params.id);
        db
            .collection('movies')
            .updateOne({_id: movieId}, {$set: req.body})
            .then(result => {
                res
                    .status(200)
                    .json(result)
            })
            .catch(() => handleError(res, "Something goes wrong..."))
    } else {
        handleError(res, "Wring id")
    }


})


















