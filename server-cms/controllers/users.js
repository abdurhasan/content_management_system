
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    create: function (req, res) {
        let username = req.body.name
        let email = req.body.email
        let password = req.body.password
        let retypepassword = req.body.retypepassword

       if(username&&email&&password&&retypepassword){
        const user = new User(req.body);
        let token = jwt.sign(req.body, process.env.SECRET, { expiresIn: "24h" })

        if (password == retypepassword) {

            user.save((err, doc) => {
                if (err) return res.json({ success: false, errmsg:'EMAIL REGISTERED' });
                res.status(200).json({
                    success: true,
                    doc,
                    token:token
                })
            })
        }else{
            res.json({success: false,errmsg:'CHECK YOUR INPUT'})
        }
       }else res.json({success: false,errmsg:'CHECK YOUR INPUT'})
    },
    signIn: function (req, res) {
        User.findOne({ 'email': req.body.email }, (err, user) => {
            if (!user) return res.json({ loginSuccess: false, message: 'email not found' });

            user.comparePassword(req.body.password, (err, isMatch) => {
                let token = jwt.sign(req.body, process.env.SECRET, { expiresIn: "24h" })
                if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });
                res.cookie('x_auth', token).status(200).json({
                    loginSuccess: true,
                    data: user,
                    token: token
                })

            })
        })
    },
    getAll: function (req, res) {
        User.find({}).then(users => {
            res.json(users);
        })
    },
    signOut: function (req, res) {
        res.clearCookie('x_auth').json({
            logout: true
        })
    },
    check: function (req, res) {
        res.json({ valid: true, data: req.user })
    }










}