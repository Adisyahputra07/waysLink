"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      brand.belongsTo(models.user, {
        as: "user_id",
        foreignKey: {
          name: "userId",
        },
      });

      brand.hasMany(models.link, {
        as: "link_id",
        foreignKey: {
          name: "brandId",
        },
      });
    }
  }
  brand.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      uniequeLink: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "brand",
    }
  );
  return brand;
};
