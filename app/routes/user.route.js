const user = require('../models/user.model');
const userController = require('../controllers/user.controller');


/**
 * POST
 */
server.post('users/register', function (req, res, next) {
    // let data = req.body || {}
    let data = {
        name: {
        first: "eissa",
        last: "medo"
    },
    mail: "ewejwlel"
    }
    userController.addUser(data, res, next);
})


/**
 * GET
 */
server.get('/users/:user_id', function (req, res, next) {
    userController.getUser(req, res, next)
})


/**
 * UPDATE
 */
server.put('/users/:user_id', function (req, res, next) {
    userController.updateUser(req, res, next)
})

