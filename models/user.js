'use strict';
const {
  Model
} = require('sequelize');
const { generatePassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Meeting, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required"
        }
      },
      unique: {
        args: true,
        msg: "Username must be required"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: {
        args: true,
        msg: "Email is already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must be required"
        },
        max: {
          args: [12],
          msg: "Maximum 12 characters in password"
        },
        min: {
          args: [4],
          msg: "Minimum 4 characters required in password"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Phone Number must be required"
        },
        min: {
          args: [8],
          msg: "Minimum 8 characters required in Phone Number"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        instance.password = generatePassword(instance.password);
      }
    }
  });
  return User;
};