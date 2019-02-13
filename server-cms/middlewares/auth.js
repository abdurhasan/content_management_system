const jwt = require('jsonwebtoken')
const { User } = require('../models/user');

require('dotenv').config();

module.exports = {
    auth: (req, res, next) => {

        var token = req.cookies.x_auth || req.query.x_auth || req.body.x_auth || req.body.token
        if (token) {
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
                if (err) res.json({ valid: false })
                else {
                    User.findOne({ 'email': decoded.email }, (err, user) => {
                        req.user = user
                        next()
                    })
                }
            })
        } else {
            res.json({ message: 'PLEASE LOGIN FIRST' }).send(403)
        }
    }
}
