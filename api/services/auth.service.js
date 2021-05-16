import jwt from "jsonwebtoken";

const secret_key = process.env.JWT_SECRET;

const token = {};

//Generate Token
token.generate = (data) =>
  new Promise(async (res, rej) => {
    try {
      //Get only required data
      const obj = {
        id: data.id,
      };
      console.log(obj);

      const token = jwt.sign(
        {
          ...obj,
        },
        secret_key
      );

      res(token);
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });

export default token;
