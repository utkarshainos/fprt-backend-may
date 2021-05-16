import Image from "../models/image.model";
import { unlinkSync } from "fs";
import CustomError from "../errorHandlers/CustomError";

const service = {};

//save to db
service.upload = (filePath, req) =>
  new Promise(async (res, rej) => {
    try {
      const { title, description, image_by, is_private } = req.body;

      const user = req.user;

      const image = await Image.create({
        title,
        description,
        image_by,
        is_private,
        url: filePath,
        user_id: user.id,
        userId: user.id,
      });

      res(image);
    } catch (error) {
      rej(error);
    }
  });

//Get public image
service.getPublicImages = () =>
  new Promise(async (res, rej) => {
    try {
      const images = await Image.findAll({
        where: {
          is_private: false,
        },
      });

      res(images);
    } catch (error) {
      rej(error);
    }
  });

//Get private images
service.getPrivateImages = (req) =>
  new Promise(async (res, rej) => {
    try {
      const user = req.user;

      const images = await Image.findAll({
        where: {
          is_private: true,
          user_id: user.id,
        },
      });

      res(images);
    } catch (error) {
      rej(error);
    }
  });

//Delete image
service.deleteImage = (req) =>
  new Promise(async (res, rej) => {
    try {
      const user = req.user;
      const { imageId } = req.params;

      const image = await Image.findOne({
        where: {
          user_id: user.id,
          id: imageId,
        },
      });

      if (!image) {
        rej(new CustomError(404, "No Image found"));
      }

      //Delete record from db
      await Image.destroy({
        where: {
          user_id: user.id,
          id: imageId,
        },
      });

      //remove file from storage
      await unlinkSync(image.url);

      res({
        message: "Images has been deleted",
      });
    } catch (error) {
      rej(error);
    }
  });

export default service;
