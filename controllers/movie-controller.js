const Movie = require('../models/movie')
// fun error
const handleError = (res, error) => {
    res.status(500).json({error})
}


//get all items
const getAllMovies = (req, res) => {
    Movie
        .find()
        .sort({title: 1})
        .then((allMovies) => {
            res
                .status(200)
                .json(allMovies)
        })
        .catch((error) => handleError(res, error))
}

//get one item
const getOneItem = (req, res) => {
    Movie
        .findById(req.params.id)
        .then((item) => {
            res
                .status(200)
                .json(item)
        })
        .catch((error) => handleError(res, error))
}

// delete one item
const deleteOneItem = (req, res) => {
    Movie
        .findOneAndDelete({_id: req.params.id})
        .then((result) => {
            res
                .status(200)
                .json(result)
        })
        .catch((error) => handleError(res, error))
}
//  add one item
const addOneItem=(req,res)=>{
    const movie = new Movie(req.body)
    movie
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result)
        })
        .catch((error) => handleError(res, error))
}

//Update one item
const patchOneItem=(req,res)=>{
    Movie
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res
                .status(200)
                .json(result)
        })
        .catch((error) => handleError(res, error))
}


module.exports = {
    getAllMovies,
    getOneItem,
    deleteOneItem,
    addOneItem,
    patchOneItem,
}