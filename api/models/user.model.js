import Sequelize from "sequelize";

const User = db.define("users", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    exclude: true,
  },
});

// User.sync({
//   force: true
// })

export default User;
