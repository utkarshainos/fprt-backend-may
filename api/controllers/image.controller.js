import { handleErrors } from "../errorHandlers/error.handler";
import path from "path";
import imageService from "../services/image.service";

const controller = {};

controller.upload = async (req, res) => {
  try {
    const targetPath = path.join(__dirname, "../../", req.file.path);

    const result = await imageService.upload(targetPath, req);

    res.status(201).json(result);
  } catch (e) {
    handleErrors(e, res);
  }
};

controller.getPublicImages = async (req, res) => {
  try {
    const result = await imageService.getPublicImages();

    res.status(200).json(result);
  } catch (e) {
    handleErrors(e, res);
  }
};

controller.getPrivateImages = async (req, res) => {
  try {
    const result = await imageService.getPrivateImages(req);

    res.status(200).json(result);
  } catch (e) {
    handleErrors(e, res);
  }
};

export default controller;
