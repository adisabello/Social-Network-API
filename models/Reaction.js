const mongoose = require('mongoose');

const ReactionSchema = mongoose.Schema({
    reactionId : {
        type: mongoose.ObjectId,
    },
    reactionBody: {
        type: String,
        maxLength: 280,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        getter: formatDate
    }
});

function formatDate(date){
    return date;
}

module.exports = mongoose.model("Reaction",ReactionSchema);