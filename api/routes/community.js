const router = require('express').Router();
const Community = require('../models/Community');
const User = require('../models/User');


router.get('/',(req,res)=>{
    console.log("community page")
})
//create community
router.post('/',async(req,res)=>{
    const newCommunity = new Community(req.body)
    try{
        const savedCommunity = await newCommunity.save();
        res.status(200).json('communaute cree')
    }catch(err){
        res.status(500).json(err)
    }
})


//update community
router.put("/:id",async (req, res) => {
    try {
        // Récupérer l'utilisateur à partir de l'ID fourni
        const user = await User.findById(req.body.userId);

        // Vérifier si l'utilisateur est un administrateur
        if (user && user.isAdmin) {
            const community = await Community.findById(req.params.id);
            if (community) {
                // Mettre à jour la communauté
                await community.updateOne({ $set: req.body });
                res.status(200).json('community updated');
            } else {
                res.status(404).json('Community not found');
            }
        } else {
            res.status(403).json('you must be admin to update community');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;