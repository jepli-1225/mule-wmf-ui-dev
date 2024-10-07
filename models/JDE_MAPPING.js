const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "JDE_MAPPING",
    {
      MAPID: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      SYS1_VAL1: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      SYS1_VAL2: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      SYS2_VAL1: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      SYS2_VAL2: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "JDE_MAPPING",
      schema: "dbo",
      timestamps: false,
    }
  );
};
