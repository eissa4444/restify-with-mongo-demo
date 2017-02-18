const mongoose = require('mongoose');
const schema = mongoose.Schema;
// require('./user');
// require('./actor');
// require('./director');

// create the resturantschema
const movieSchema = new schema({
    name: String,
    description: String,
    directors: [{ type: schema.Types.ObjectId, ref: 'Director' }],
    actors: [{ type: schema.Types.ObjectId, ref: 'Actor' }],
    image: String,
    trailers:[String],
    tags: [String],
    ratings: [
        {
            user_id: { type: schema.Types.ObjectId, ref: 'User', unique: true },
            vote: Number
        }
    ],
    comments: [
        {
            user_id: { type: schema.Types.ObjectId, ref: 'User' },
            comment_text: String,
            comment_text: { type: Date, default: Date.now }
        }
    ],

    similar_movies: [{
        movie_id: { type: schema.Types.ObjectId, ref: 'Movie' },
    }]
});



// build the Resturant model from the resturantSchema
const Movie = mongoose.model('Movie', movieSchema);

module.export = Movie;

