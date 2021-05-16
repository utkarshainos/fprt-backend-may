import { handleErrors } from "../errorHandlers/error.handler";
import path from "path";

const controller = {};

controller.upload = async (req, res) => {
  try {
    console.log(req.file);
    const targetPath = path.join(__dirname, "../../", req.file.path);

    res.status(201).json(targetPath);
  } catch (e) {
    handleErrors(e, res);
  }
};

export default controller;
