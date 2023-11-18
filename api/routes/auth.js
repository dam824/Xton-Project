const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Community = require('../models/Community');


//REGISTER
router.post('/register', async (req, res) => {
    try {
        console.log("Requête reçue: ", req.body);
        const communityName = req.body.communityName;
        console.log("Recherche de la communauté: ", communityName);
        const community = await Community.findOne({ name: communityName });

        console.log("Communauté trouvée: ", community);

        if (!community) {
            return res.status(404).json({ message: "Communauté non trouvée" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log("Mot de passe haché: ", hashedPassword);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            communaute: community._id,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });

        console.log("Nouvel utilisateur: ", newUser);

        const user = await newUser.save();
        console.log("Utilisateur enregistré: ", user);
        res.status(200).json(user);
    } catch (err) {
        console.error("Erreur lors de l'enregistrement: ", err);
        res.status(500).json(err);
    }
});

/* router.post('/register',async(req,res) => {
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            communaute: req.body.communaute,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });
        
        //save user and response
        const user = await newUser.save();
            res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
}); */

//LOGIN

router.post('/login', async (req, res)=> {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).send('user not found');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json('wrong password');
        }

        //create token jwt
        const token = jwt.sign(
            {_id: user._id, isAdmin: user.isAdmin},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        //send token to header
        res.header('auth-token', token).json({ token: token});
    }catch(err){
        res.status(500).json(err);
    }
});

/* router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
    !user && res.status(404).send('user not found')
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json('wrong password')

        //if password and email ok 
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }
});
 */


module.exports = router