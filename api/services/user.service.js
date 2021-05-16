import User from "../models/user.model";
import encryptionService from "../services/encryption.service";
import jwt from "../services/auth.service";

const services = {};

//==========================================Signup Service==========================================
services.signup = (data) =>
  new Promise(async (res, rej) => {
    try {
      //Get Password and hash it
      const { password, ...remData } = data;

      //Get hash
      const hash = await encryptionService.encrypt(password);

      const user = await new User({
        password: hash,
        ...remData,
        isLoggedIn: true,
      }).save();

      //Generate Token
      const token = await jwt.generate(user);

      res({
        user,
        token,
      });
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

//==========================================Login Service==========================================

services.login = (data) =>
  new Promise(async (res, rej) => {
    try {
      //Get id
      const { email } = data;

      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          $set: {
            login_at: Date.now(), //Update login_at
            isLoggedIn: true, //Update isLoggedIn flag
          },
        },
        {
          runValidators: true,
          new: true,
        }
      ).exec();

      //Generate Token
      const token = await jwt.generate(user);

      res({
        user,
        token,
      });
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

export default services;
