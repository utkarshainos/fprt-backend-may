import Image from "../models/image.model";

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

export default service;
