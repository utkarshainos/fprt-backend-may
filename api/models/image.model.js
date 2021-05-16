import Sequelize from "sequelize";
import User from "./user.model";

const Image = db.define("images", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_by: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_private: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

Image.belongsTo(Image);

// Image.sync({
//   force: true,
// });

export default Image;
