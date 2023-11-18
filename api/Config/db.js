const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connect to mongodb');
    }catch(error){
        console.error('could not connect to mongodb', error);
    }
}

module.exports = connectToMongoDB;