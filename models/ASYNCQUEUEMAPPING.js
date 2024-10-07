const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ASYNCQUEUEMAPPING",
    {
      CONFIGID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.fn("newsequentialid"),
        primaryKey: true,
      },
      INTERFACEID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      BUSINESSEVENT: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      CLIENTID: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      QUEUEURL: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      SYSTEMNAME: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      STATUS: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      DOMAINID: {
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
        defaultValue: "1900-01-01 00:00:00",
      },
      UPDATEDBY: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      UPDATEDON: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: "1900-01-01 00:00:00",
      },
    },
    {
      sequelize,
      tableName: "ASYNCQUEUEMAPPING",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PK_ASYNCQUEUEMAPPING",
          unique: true,
          fields: [{ name: "CONFIGID" }],
        },
      ],
    }
  );
};