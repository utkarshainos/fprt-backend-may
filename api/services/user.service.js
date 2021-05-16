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

      const user = await User.findOne({
        where: { email },
        attributes: {
          exclude: ["password"],
        },
      });

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
