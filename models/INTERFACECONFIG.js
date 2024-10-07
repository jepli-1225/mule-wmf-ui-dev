const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "INTERFACECONFIG",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      INTERFACEID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      CREATEDBY: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      CREATEDON: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("GETDATE()"),
      },
      UPDATEDBY: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      UPDATEDON: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      SOURCESYSTEM: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      DESTINATIONVALUE: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      DESTINATIONTYPE: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      BUSINESSEVENT: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      DESCRIPTION: {
        type: DataTypes.STRING(200),
        allowNull: true,
        defaultValue: "",
      },
      DOMAINID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      REPLAYABLE: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      TARGETSYSTEM: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      MESSAGEPROPERTIES: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "INTERFACECONFIG",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "IDX_INTERFACECONFIG_INTERFACEID_BUSINESSEVENT_SOURCESYSTEM_DOMAINID",
          unique: true,
          fields: [
            { name: "INTERFACEID" },
            { name: "BUSINESSEVENT" },
            { name: "SOURCESYSTEM" },
            { name: "TARGETSYSTEM" },
            { name: "DOMAINID" },
          ],
        },
        {
          name: "PRK_INTERFACECONFIG",
          unique: true,
          fields: [{ name: "ID" }],
        },
      ],
    }
  );
};
