const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/',(req,res) => {
    res.send('user route')
})

//update user
router.put('/:id', async(req,res) => {
    //if body id = params id =>this id =>  /:id
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err)
            }
        }
        //update actual user after find him
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("account has been updated")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can update only your account")
    }
})

//delete user

router.delete('/:id', async(req,res) => {
    //if body id = params id =>this id =>  /:id
    if(req.body.userId === req.params.id || req.body.isAdmin){
        //update actual user after find him
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("account has been deleted")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can delete only your account")
    }
})

//get a user
router.get('/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id).populate('communaute');
        //hide useless informations by get request
        //...other = spread opertor send new array without password,updatedAt
        const {password,updatedAt, ...other}= user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})

//follow a user, with id in route
router.put('/:id/follow', async (req,res) => {
    //chekc if this user is same one or no if yes send error
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //if user id is != from his own id, so if he ain't try to follow himself
            if(!user.followers.includes(req.body.userId)){
                //add friend
                await user.updateOne({$push:{followers:req.body.userId} });
                await currentUser.updateOne({$push:{following:req.params.id}})
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json('you already follow this user')
            }

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you cant follow yourself")
    }
})

//unfolow the user who s id is in the route

router.put('/:id/unfollow', async (req,res) => {
    //chekc if this user is same one or no if yes send error
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //if user id is != from his own id, so if he ain't try to follow himself
            if(user.followers.includes(req.body.userId)){
                //add friend
                await user.updateOne({$pull:{followers:req.body.userId} });
                await currentUser.updateOne({$pull:{following:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json('you don t follow this user')
            }

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you cant unfollow yourself")
    }
})


module.exports = router