const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

router.get('/', (req, res)=>{
    Thought.find()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Could not fetch thoughts"});
    });
});

router.get('/:id', (req, res)=>{
    Thought.findById(req.params.id).populate('reactions')
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Could not fetch thoughts"});
    });
});

router.post('/',(req, res)=>{
    let thought = new Thought(req.body);
    thought.save()
    .then(data =>{
        res.status(200).json(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Could not create thought"});
    });
});

router.put('/:id', (req, res)=>{
    Thought.findById(req.params.id).then(thought =>{
        thought.thoughtText = req.body.thoughtText;
        thought.username = req.body.username;
        thought.user_id = req.body.user_id;
        thought.save();
        res.status(200).send(thought);
    }).catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to update thought"});
    });
});

router.delete('/:id', (req, res)=>{
    let id = req.params.id;
    Thought.deleteOne({
        _id: id
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to delete thought"});
    });
});

router.post('/:thoughtId/reactions', async (req, res) =>{
    let reaction = new Reaction(req.body);
    let tId = req.params.thoughtId;
    let ret = await reaction.save()
    let thought = await Thought.findById(tId);
    thought.reactions.push(ret);
    let val = await thought.save();
    res.status(200).json(val);
});

router.delete('/:thoughtId/reactions/:id', async (req, res) =>{
    let reactionId = req.params.id;
    let thought = await Thought.findById(req.params.thoughtId);
    let reactions = [];
    for(var i = 0; i < thought.reactions.length; i++){
        if(thought.reactions[i]._id != reactionId){
            reactions.push(thought.reactions[i]);
        }
    }
    thought.reactions = reactions;
    let val = await thought.save();
    res.status(200).json(val);
});

module.exports = router;
