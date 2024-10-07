const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "INTERFACEPERMISSIONS",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      INTERFACECONFIG: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "INTERFACECONFIG",
          key: "ID",
        },
      },
      USER: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      VIEW: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      DOWNLOAD: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      REPLAY: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "INTERFACEPERMISSIONS",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "IDX_INTERFACEPERMISSIONS_USER",
          unique: true,
          fields: [{ name: "INTERFACECONFIG" }, { name: "USER" }],
        },
        {
          name: "PRK_INTERFACEPERMISSIONS",
          unique: true,
          fields: [{ name: "ID" }],
        },
      ],
    }
  );
};
