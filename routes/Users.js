const express = require("express");
const router = express.Router();
const User = require('../models/User')

router.get('/yoh', (req, res)=>{
    res.send("here");
});

router.get('/', (req, res)=>{
    User.find()
    .then((response)=>{
        res.json(response);
    })
    .catch(err =>{
        console.log(err);
    })
});

router.post('/', (req, res) =>{
    let user = new User(req.body);
    user.save()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to create user"});
    })
});

router.get('/:id', (req, res)=>{
    let user = User.findById(req.params.id).populate('friends').then(data =>{
        res.status(200).send(data);
    }).catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to find user"});
    });
});

router.put('/:id', (req, res)=>{
    let user = User.findById(req.params.id).populate().then(user =>{
        user.username = req.body.username;
        user.email = req.body.email;
        user.save();
        res.status(200).send(user);
    }).catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to update user"});
    });
});

router.delete('/:id', (req, res)=>{
    let id = req.params.id;
    User.deleteOne({
        _id: id
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to delete user"});
    })
    
});

router.post('/:userId/friends/:friendId', (req, res)=>{
    let user = User.findById(req.params.userId).populate().then(user =>{
        let friend = req.params.friendId;
        let present = false;
        for(var i = 0; i < user.friends.length; i++){
            if(user.friends[i] == friend){
                present = true;
                break;
            }
        }
        if(!present){
            user.friends.push(friend);
        }
        return user.save()
    })
    .then(us2 =>{
        res.status(200).send(us2);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to add friend"});
    });
});

router.delete('/:userId/friends/:friendId', (req, res)=>{
    let user = User.findById(req.params.userId).populate().then(user =>{
        let friend = req.params.friendId;
        let newFriends = []
        for(var i = 0; i < user.friends.length; i++){
            if(user.friends[i] != friend){
                newFriends.push(user.friends[i]);
            }
        }
        user.friends = newFriends;
        return user.save();
    })
    .then(us2 =>{
        res.status(200).send(us2);
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({message: "Failed to find user"});
    });
});

module.exports = router;
