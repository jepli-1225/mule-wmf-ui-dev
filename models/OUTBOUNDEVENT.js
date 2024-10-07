const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "OUTBOUNDEVENT",
    {
      TRANSACTIONID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.fn("newsequentialid"),
        primaryKey: true,
      },
      BUSINESSEVENT: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      OUTBOUNDCONTENT: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      STATUS: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      INSTANCEID: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      INTERFACEID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      TARGETSYSTEM: {
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
      tableName: "OUTBOUNDEVENT",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PRK_OUTBOUNDEVENT",
          unique: true,
          fields: [{ name: "TRANSACTIONID" }],
        },
      ],
    }
  );
};
