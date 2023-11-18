const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    username:{
        type:String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type:String,
        require: true,
        max: 50,
        unique: true
    },
    communaute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true,
        unique: false
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePicture:{
        type:String,
        default: ""
    },
    coverPicture:{
        type:String,
        default: ""
    },
    followers:{
        type: Array,
        default : ['']
    },
    following:{
        type: Array,
        default : ['']
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    relationship: {
        type: Number,
        enum: [1,2,3,4]
    },
},
{timestamps: true}
);



module.exports = mongoose.model('User', UserSchema);