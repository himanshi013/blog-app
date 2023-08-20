import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";
import Token from "../model/token.js";
// import { ToastContainer, toast } from 'react-toastify';

dotenv.config();
export const signupUser = async (request, response) => {
  try {
    //const salt=await bcrypt.genSalt();
    // if(User.findOne({ username: request.body.username }))
    //   throw "1";
    let match = await User.findOne({ username: request.body.username });
    if (match) {
      return !match;
      // return response.status(403).json({msg: "user already exist"});
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    // console.log("2")
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "signup succefull" });
  } catch (error) {
    // catch("1"){
    //   return
    // }
    return response.status(500).json({ msg: "error while signup the user" });
  }
};

export const loginUser = async (request, response) => {
  try {
    let user = await User.findOne({ username: request.body.username });
    if(user)console.log("1")
    else console.log("2")
  console.log(user)
    if (!user) {
      return response.status(500).json({ msg: "username not match" });
    }
    let match = await bcrypt.compare(request.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY
        // { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = await Token({ token: refreshToken });
      await newToken.save();
      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
        password: user.password,
      });
      // return response.status(200).json({message : "You are login"})
    } else {
      // return response.status(400).json({ msg: "password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ error, msg: "error while log in" });
    return false;
  }
};
