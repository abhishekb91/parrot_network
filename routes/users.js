var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function(req, res) {
    var user = {
        username    : req.body.username,
        password    : req.body.password,
        email       : req.body.email,
        firstname   : ( req.body.firstname ) ? req.body.firstname : '',
        lastname    : ( req.body.lastname ) ? req.body.lastname : ''
    };

    User.create(new User(user), function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        return res.status(200).json({status: 'Registration Successful!'});
    });
});

router.post('/login', function(req, res, next) {
    User.find({
        username: req.body.username,
        password: req.body.password
    }, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});

module.exports = router;
