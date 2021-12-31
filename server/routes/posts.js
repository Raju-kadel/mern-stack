import express from 'express';
import {getposts,createposts,updateposts,deleteposts,likeposts} from '../controllers/posts.js'
const router=express.Router();
router.get('/',getposts);
router.post('/',createposts);
router.patch('/:id',updateposts);
router.delete('/:id',deleteposts);
router.patch('/:id/likepost',likeposts);
export default router;