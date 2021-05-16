import Sequelize from "sequelize";

const Gallery = db.define("gallery", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

// Gallery.sync({
//   force: true,
// });

export default Gallery;
