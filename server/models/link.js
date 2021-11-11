"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.brand, {
        as: "links_id",
        foreignKey: {
          name: "brandId",
        },
      });

      link.belongsTo(models.user, {
        as: "links",
        foreignKey: {
          name: "createdBy",
        },
      });
    }
  }
  link.init(
    {
      title: DataTypes.STRING,
      link: DataTypes.STRING,
      image: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "link",
    }
  );
  return link;
};
