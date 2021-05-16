import { handleErrors } from "../errorHandlers/error.handler";
import path from "path";
import galleryService from "../services/gallery.service";

const controller = {};

controller.upload = async (req, res) => {
  try {
    const targetPath = path.join(__dirname, "../../", req.file.path);

    const result = await galleryService.upload(targetPath, req);

    res.status(201).json(result);
  } catch (e) {
    handleErrors(e, res);
  }
};

export default controller;
