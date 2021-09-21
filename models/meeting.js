'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meeting.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Meeting.init({
    schedule: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Date must be required"
        },
        isAfter: {
          args: new Date().toLocaleString(),
          msg: 'Dont pick expired schedule'
        }
      }
    },
    activity: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Activity must be required"
        }
      }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "User ID must be required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Meeting',
  });
  return Meeting;
};