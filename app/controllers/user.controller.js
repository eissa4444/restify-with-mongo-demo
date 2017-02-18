const User = require('../models/user.model');
const errors = require('restify-errors')


var addUser = function (data, res, next) {
    const user = new User(data)
    user.save(function (err) {

        if (err) {
            log.error(err)
            return next(new errors.InternalError(err.message))
            next()
        }

        res.send(201)
        next()

    })
}

var getUser = function (req, res, next) {
    User.findOne({ _id: req.params.user_id }, function (err, user) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        }

        res.send(user)
        next()
    })
}

var updateUser = function (req, res, next) {
    let data = req.body || {}
    User.findOne({ _id: req.params.user_id }, function (err, user) {

        if (err) {
            log.error(err)
            return next(new errors.InvalidContentError(err.errors.name.message))
        } else if (!user) {
            return next(new errors.ResourceNotFoundError('The resource you requested could not be found.'))
        }

        User.update({ _id: data._id }, data, function (err) {

            if (err) {
                log.error(err)
                return next(new errors.InvalidContentError(err.errors.name.message))
            }

            res.send(200, data)
            next()
        })

    })
}
module.exports = {
    addUser: addUser,
    getUser: getUser,
    updateUser: updateUser
}