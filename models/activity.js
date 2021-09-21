'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Activity.belongsTo(models.Day, {
        foreignKey: 'dayId'
      })
    }
  };
  Activity.init({
    time: DataTypes.TIME,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    dayId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};