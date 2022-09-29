const mongoose = require('mongoose');
var Reaction = require('./Reaction');

const ThoughtSchema = mongoose.Schema({

    thoughtText : {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt:{
        type: Date,
        default: ()=> Date.now(),
        getter: formatDate
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    reactions: [Reaction.schema]
});

function formatDate(date){
    return date;
}

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

module.exports = mongoose.model("Thought", ThoughtSchema);
