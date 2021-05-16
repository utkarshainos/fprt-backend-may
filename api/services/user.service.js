import User from "../models/user.model";
import encryptionService from "../services/encryption.service";
import jwt from "../services/auth.service";
import CustomError from "../errorHandlers/CustomError";

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
      const { email, password } = data;

      const user = await User.findOne({
        where: { email },
      });

      const isVerified = await encryptionService.verify(
        password,
        user.password
      );

      if (!isVerified) {
        rej(new CustomError(403, "invalid credentials"));
      }

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
