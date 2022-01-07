import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import post_req from './routes/posts.js';
import auth_req from './routes/users.js';
import dotenv from 'dotenv'

const app=express();
app.use(bodyParser.json({limit:'30mb',extended:'true'}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:'true'}));
app.use(cors());
dotenv.config();

const connection_url=process.env.CONNECTION_URL;
const port=process.env.PORT || 8000;
app.use('/posts',post_req);
app.use('/user',auth_req);


mongoose.connect(connection_url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(port,()=>{console.log(`Server connected to database successfully on port ${port}`);}))
.catch((e)=>console.log(e));
// mongoose.set('useFindAndModify',false);