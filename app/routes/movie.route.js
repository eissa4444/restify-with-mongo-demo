const Movie = require('../models/movie.model');
const movieController = require('../controllers/movie.controller');


/**
 * GET
 */
server.get('/movies/:movie_id', function (req, res, next) {
    movieController.getMovie(req, res, next)
})

/**
 * LIST
 */
server.get('/movies', function (req, res, next) {
    movieController.getMovies(req, res, next)
})


/**
 * POst
 */
server.post('/movies', function (req, res, next) {
    let data = req.body || {}
    movieController.addMovie(data, res, next);
})


/**
 * UPDATE
 */
server.put('/movies/:movie_id', function (req, res, next) {
   movieController.updateMovie(req, res, next)
})


/**
 * DELETE
 */
server.del('/movies/:movie_id', function (req, res, next) {
    movieController.deleteMovie(req, res, next)
})

/**
 * Post
 */
server.post('/rate*', function (req, res) {
    movieController.addRate(req, res)
});

/**
 * Post
 */
server.post('/comment*', function (req, res) {
    movieController.addComment(req, res)
});


