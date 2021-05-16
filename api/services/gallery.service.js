import Gallery from "../models/gallery.model";

const service = {};

//save to db
service.upload = (filePath, req) =>
  new Promise(async (res, rej) => {
    try {
      const { title, description, image_by, is_private } = req.body;

      const user = req.user;

      const image = await Gallery.create({
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

export default service;
