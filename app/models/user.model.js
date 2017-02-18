const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Movie = require('./movie');
// const actor = require('./actor');
const bcrypt = require('bcrypt');


// user Schema
const userSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    mail: String,
    password: { type: String, bcrypt: true },
    photo: String,
    birthDate: { type: Date },
    gender: String,
    mobile: String,
    role: String,
    favourite_movies: [{ movie_id: { type: Schema.Types.ObjectId, ref: 'Movie' } }],
    favourite_actors: [{ actor_id: { type: Schema.Types.ObjectId, ref: 'Actor' } }],
    ratings: [{
        movie_id: { type: Schema.Types.ObjectId, ref: 'Movie' },
        vote: Number,
        _id: false
    }],
}, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true,
            transform: function (doc, ret, game) {
                delete ret.__v;
                delete ret._id;
            }
        },
    });

userSchema.index({ 'ratings.movie_id': 1 }, { unique: true });

// make a virtual property to get and set the user full name
userSchema.virtual('name.full')
    .get(function () {
        return this.name.first + ' ' + this.name.last;
    }).set(function (fullName) {
        const split = fullName.split(' ')
            , firstName = split[0]
            , lastName = split[1];

        this.set('name.first', firstName);
        this.set('name.last', lastName);
    });


//create the user model from usersSchema
const User = mongoose.model('User', userSchema);

module.exports = User;
