const mongoose = require('mongoose');
const schema = mongoose.Schema;
// const User = require('./movie');

// user schema
const actorSchema = new schema({
    name: {
        first: String,
        last: String
    },
    movies: [{ movie_id: { type: schema.Types.ObjectId, ref: 'Movie' } }],
   
});


const Actor = mongoose.model('Actor', actorSchema);

module.export = Actor;
