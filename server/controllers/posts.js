import mongoose from "mongoose";
import PostMessage from "../models/PostMessage.js";
export const getposts = async (req, res) => {
  try {
    const message = await PostMessage.find();
    // console.log(message);
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//createposts functionality goes here..
export const createposts = async (req, res) => {
  try {
    const post = req.body;
    const newposts = new PostMessage({...post,creator:req?.userId,createdAt:new Date().toISOString()});
    // console.log(`this is posts from createposts req ${newposts}`);
    await newposts.save();
    res.status(200).json(newposts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Update functionality goes here....
export const updateposts = async (req, res) => {
  const { id: _id } = req.params;
  console.log(`api id ${_id}`);
  const post = req.body;
  console.log(req.body);
  console.log('req body update post above');
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "No posts with requested id" });
  }
  const update_post = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  console.log('i am update post');
  res.status(200).json(update_post);
};

//delete posts functionality goes here..
export const deleteposts = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "No posts with requested id" });
  }
  await PostMessage.findByIdAndDelete(_id);
  res.status(200).json({ message: "Memory deleted successfully" });
};

//Like functionality goes here...
export const likeposts = async (req, res) => {
  const { id: _id } = req.params;
  console.log('req below');
  console.log(req.userId);
  if (!req.userId) {
    return res.status(404).json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ message: "No posts with requested id" });
  }
  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updated_post = await PostMessage.findByIdAndUpdate(
    _id,
   post,
    { new: true }
  );
  res.status(200).json(updated_post);
};
