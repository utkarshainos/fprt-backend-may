import User from "../models/user.model";
import service from "../services/user.service";
import { handleErrors } from "../errorHandlers/error.handler";

const controller = {};

//User Signup
controller.signup = async (req, res) => {
  try {
    //Create new user
    const user = await service.signup(req.body);

    res.status(201).json(user);
  } catch (e) {
    handleErrors(e, res);
  }
};

//User Login
controller.login = async (req, res) => {
  try {
    const user = await service.login(req.body);

    res.status(201).json(user);
  } catch (e) {
    handleErrors(e, res);
  }
};

export default controller;
