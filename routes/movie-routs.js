const express = require('express');

const router = express.Router();


const {
    getAllMovies,
    getOneItem,
    deleteOneItem,
    addOneItem,
    patchOneItem,
} = require('../controllers/movie-controller');

// get all items
router.get('/movies', getAllMovies);

//get one item
router.get('/movies/:id', getOneItem)

//delete item
router.delete('/movies/:id', deleteOneItem)

// Add item
router.post('/movies', addOneItem)

//Update one item
router.patch('movies/:id',patchOneItem)


module.exports = router;