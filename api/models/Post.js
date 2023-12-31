const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema (
    {
    userId:{
        type : String,
        required: true,
    },
    desc:{
        type:String,
    },
    communaute:{
        type: String,
    },
    img : {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    },
{timestamps: true}
);



module.exports = mongoose.model('Post', PostSchema);