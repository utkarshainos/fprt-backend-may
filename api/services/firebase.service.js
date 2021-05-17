import bucket from "../config/firebase";

const service = {};

service.upload = (filePath) =>
  new Promise(async (res, rej) => {
    try {
      const file = await bucket.upload(filePath);

      const url = await bucket.file(file[0].metadata.name).getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });

      console.log(url);

      res(url);
    } catch (error) {
      rej(error);
    }
  });

export default service;
