import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import {genToken, genToken1 } from "../config/token.js";



export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }

   if (password.length < 6) {
  return res
    .status(400)
    .json({ message: "Password must be at least 6 characters" });
}

    const hashPassword = await bcrypt.hash(password, 10);

    console.log("BODY:", req.body);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Registration error ${error}` });
  }
};

export const login = async (req,res)=>{
  try{
    let {email, password}= req.body;
    let user = await User.findOne({email}) 
    if(!user){
      return res.status(400).json({ message: "User is not found " });
    }
    let isMatch= await bcrypt.compare(password,user.password)

    if (!isMatch){
      return res.status(400).json({message:"Incorrect password"})
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json(user)


} catch (error) {
    console.log( "login error");
    return res.status(500).json({ message: `Login error ${error}` });
  }
}


export const logout = async(req,res)=>{
  try{
    res.clearCookie("token")

    return res.status(200).json({message:"logout successful"})
  }  catch (error) {
    console.log( "logout error");
    return res.status(500).json({ message: `LogOut error ${error}` })
  }

}


export const googleLogin = async (req,res) => {
  try{
    let {name,email}= req.body;

    let user = await User.findOne({email}) 
    if(!user){
      user = await User.create({
         name,email})
    }
    

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(200).json(user)

  }catch (error){

    console.log( "googleLogin  error");
    return res.status(500).json({ message: `googleLogin  error ${error}` })
  }
}

export const adminLogin = async (req,res) => {
  try {
    
    let {email,password}= req.body

    if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token = await genToken1(email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    return res.status(200).json(token)
    }

    return res.status(400).json({message:"invalid credentials"})
  } catch (error) {

    console.log( "AdminLogin  error");
    return res.status(500).json({ message: `AdminLogin  error ${error}` })
    
  }
  
}