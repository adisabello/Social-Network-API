const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trimmed: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val)=>{
                return /(^$|^.*@.*\..*$)/.test(val)
            },
            message: "Invalid email"
        }
    },
    thoughts:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }]
});

UserSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});

module.exports = mongoose.model("User", UserSchema);