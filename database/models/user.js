'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });
      User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
    }

    async isValidPassword(password) {
      return await bcrypt.compare(password, user.password);
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    timestamps: true
  });

  User.addHook('beforeCreate', async (user, options, next) => {
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  return User;
};