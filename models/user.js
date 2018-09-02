var mongoose                = require('mongoose');
var uniqueValidator         = require('mongoose-unique-validator');
var Schema                  = mongoose.Schema;
var passportLocalMongoose   = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        index: true
    },
    password: String,
    email: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        index: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.getName = function () {
    return (this.firstname + ' ' + this.lastname);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);