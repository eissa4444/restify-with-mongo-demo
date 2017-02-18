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
    movie.controller.addMovie(data, res, next);
})


/**
 * UPDATE
 */
server.put('/movies/:movie_id', function (req, res, next) {
    movie.controller.updateMovie(req, res, next)
})


/**
 * DELETE
 */
server.del('/movies/:movie_id', function (req, res, next) {
    movie.controller.deleteMovie(req, res, next)
})

/**
 * Post
 */
server.post('/rate*', function (req, res) {
    movie.controller.addRate(req, res)
});

/**
 * Post
 */
server.post('/comment*', function (req, res) {
    movie.controller.addComment(req, res)
});


