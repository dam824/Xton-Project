const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectToMongoDB = require('./Config/db');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const communityRoute = require('./routes/community');

//token
const verifyToken = require('./Middleware/verifyToken');

const app = express();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());


app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/community',verifyToken ,communityRoute );


//connexion bdd
connectToMongoDB();
//port
app.listen(8800, () => {
    console.log('serveur is runing')
})
