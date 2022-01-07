import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";

export const signin = async (req, res) => {
  console.log(req.body);
  console.log('above');
  const { email, password } = req.body;
  try {
    const existing_user = await  Users.findOne({ email });
    if (!existing_user) {
      return res.status(404).json({message: "User doesn't exists." });
    }
    console.log(existing_user);
    console.log('aboveeit');

    const ispassword_true = await bcrypt.compare(
      password,
      existing_user.password
    );
    if (!ispassword_true) {
     return  res.status(404).json({ message: "Invalid Credentials" });
    }
    console.log('aboveee');

    const token = jwt.sign(
      { email: existing_user.email, id: existing_user._id },
      "jsonwebtokensecret",
      { expiresIn:60 }
    );
    res.status(200).json({ result: existing_user, token });
  } catch (error) {
    res.status(500).json({ message:'Something went wrong !'})
    res.status(500).json(error);

  }
};

export const signup=async (req,res)=>{

    const {firstname,lastname,email,password,cpassword}=req.body;
    try {


        const existing_user=await  Users.findOne({email});
        if(existing_user){
            return res.status(404).json({message:'Username already exists'});
        }
   

        if(password !==cpassword){
            return res.status(404).json({message:'Passwords do not match'});
        }
        const hashedPassword=await bcrypt.hash(password,12);
 
        
        const newUser=await  Users.create({name:`${firstname} ${lastname}`,password:hashedPassword,email})
    
    console.log(newUser);
    console.log(newUser._id);
    console.log('above newuser');
        
        const token=jwt.sign({email:newUser.email,id:newUser._id},'jsonwebtokensecret',{expiresIn:60});
   
        res.status(200).json({result:newUser,token});
       

    }
     catch (error) {
        res.status(500).json({message:error});
    }




}
