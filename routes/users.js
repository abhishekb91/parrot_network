var express     = require('express');
var router      = express.Router();
var User        = require('../models/user');
var passport    = require('passport');
var Verify      = require('./verify');

/* GET users listing. */
router.get('/', [Verify.verifyUser, Verify.verifyAdmin], function(req, res, next) {
    User.find({}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});

/* Get a User's Profile details */
router.get('/profile-details', [Verify.verifyUser], function(req, res, next) {
    res.send(req.decoded);
});

/* Register a User */
router.post('/register', function(req, res) {
    var user = {
        username    : req.body.username,
        email       : req.body.email,
        firstname   : ( req.body.firstname ) ? req.body.firstname : '',
        lastname    : ( req.body.lastname ) ? req.body.lastname : ''
    };

    User.register(new User(user), req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        return res.status(200).json({status: 'Registration Successful!'});
    });
});

/* Login a User */
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            var token = Verify.getToken(user);

            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req,res,next);
});

/* Logout a User */
router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'User logged out',
        success: true
    });
});

module.exports = router;