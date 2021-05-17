import { handleErrors } from "../errorHandlers/error.handler";
import path from "path";
import imageService from "../services/image.service";
import firebaseService from "../services/firebase.service";

const controller = {};

controller.upload = async (req, res) => {
  try {
    const url = await firebaseService.upload(req.file.path);
    const result = await imageService.upload(url[0], req);
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

controller.deleteImage = async (req, res) => {
  try {
    const result = await imageService.deleteImage(req);

    res.status(200).json(result);
  } catch (e) {
    handleErrors(e, res);
  }
};

export default controller;
