const errors = require('restify-errors')
const Movie = require('../models/movie.model');


var addMovie = function (data, res, next) {
    const movie = new Movie(data)
    movie.save(function (err) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.send(201)
        next()

    })

}

var getMovie = function (req, res, next) {
    Movie.findOne({ _id: req.params.movie_id }, function (err, movie) {
        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(movie)
        next()
    })
}


var getMovies = function (req, res, next) {
    Movie.find({}, function (err, movies) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(movies)
        next()
    })
}

var updateMovie = function (req, res, next) {

    let data = req.body || {}
    Movie.findOne({ _id: req.params.movie_id }, function (err, movie) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!movie) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
        }

        Movie.update({ _id: data._id }, data, function (err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.send(200, data)
            next()

        })

    })
}

var deleteMovie = function (req, res, next) {
    Movie.remove({ _id: req.params.movie_id }, function (err) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(204)
        next()

    })
}

var addRate = function (req, res) {

    if (req.session && req.session.user) {
        const rate = req.body.rate;
        const rest_id = req.body.id;
        const user_id = req.session.user._id;

        if (rate && rest_id && user_id) {
            insertRate(user_id, rest_id, rate);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ msg: "success", rate: rate }));
        }

    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify("login"));
    }
}


var addComment = function (req, res) {
    const user_id = req.session.user._id;
    const movie_id = req.body.movie_id;
    const comment = req.body.comment;

    if (comment && movie_id) {
        insertComment(req.session.user._id, req.body.movie_id, comment, function () {
            Movie.findOne({ _id: req.body.movie_id }, function (err, movie) {

                if (movie) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(movie.comments));
                }

            }).populate('reviews.user_id');
        });
    }
}


function insertComment(user_id, movie_id, comment, callback) {
    //to check if user rate before
    Movie.findOne({ _id: movie_id }, function (err, movie) {

        if (movie) {
            Movie.update({ '_id': rest_id },
                { $push: { "comments": { "user_id": user_id, "comment_text": comment, "comment_text": getDate("formated") } } },
                function () {
                    callback();
                }
            );
        }

    });

}

//add and update rate
function insertRate(user_id, movie_id, vote) {
    //to check if user rate before
    Movie.findOne({ _id: movie_id, "ratings.user_id": user_id }, function (err, movie) {

        // if not rate before insert it
        if (!movie) {
            Movie.update({ '_id': rest_id },
                { $push: { "ratings": { "vote": vote, "user_id": user_id } } },
                { upsert: true }
            );

            //insert into user's ratings list
            User.update({ '_id': user_id },
                { $push: { "ratings": { "vote": vote, "movie_id": movie_id } } },
                { upsert: true },
                function () { }
            );

        }
        // if he rate before delete it then insert the new(update)
        else {

            /*
                update for movie's ratings list 
             */
            Movie.update(
                { '_id': movie_id },
                { $pull: { "ratings": { "user_id": user_id } } },
                false,
                function () { }
            );
            //then insert the new rate 
            Movie.update({ '_id': movie_id },
                { $push: { "rates": { "vote": vote, "user_id": user_id } } },
                { upsert: true },
                function () { }
            );

            /*
              update for user's ratings list 
           */
            //delete or remove
            User.update(
                { '_id': user_id },
                { $pull: { "ratings": { "movie_id": movie_id } } },
                false,
                function () { }
            );

            //then insert te new rate 
            User.update({ '_id': user_id },
                { $push: { "ratings": { "vote": rate, "movie_id": movie_id } } },
                { upsert: true },
                function () { }
            );
        }
    });
}

module.exports = {
    addMovie: addMovie,
    getMovie: getMovie,
    getMovies: getMovies,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie,
    addRate: addRate
}