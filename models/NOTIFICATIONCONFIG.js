const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "NOTIFICATIONCONFIG",
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
      BUSINESSEVENT: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      SOURCESYSTEM: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      DOMAINID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      RECIPIENTTO: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: "",
      },
      RECIPIENTCC: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: "",
      },
      EMAILSUBJECT: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "",
      },
      EMAILTEMPLATE: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      TRIGGERCONDITION: {
        type: DataTypes.TEXT,
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
      NOTIFICATIONKEY: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      DESCRIPTION: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "NOTIFICATIONCONFIG",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "IDX_NOTIFICATIONCONFIG_NOTIFICATIONKEY_DOMAINID",
          unique: true,
          fields: [{ name: "NOTIFICATIONKEY" }, { name: "DOMAINID" }],
        },
        {
          name: "PRK_NOTIFICATIONCONFIG",
          unique: true,
          fields: [{ name: "ID" }],
        },
      ],
    }
  );
};
