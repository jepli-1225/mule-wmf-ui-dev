const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "INBOUNDEVENT",
    {
      TRANSACTIONID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.fn("newsequentialid"),
        primaryKey: true,
      },
      INBOUNDCONTENT: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      STATUS: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      INTERFACEID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      SOURCESYSTEM: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      INSTANCEID: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      BUSINESSEVENT: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      INBOUNDPROPERTIES: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      DOMAINID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      TARGETSYSTEM: {
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
      tableName: "INBOUNDEVENT",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "IDX_CREATEDON",
          fields: [{ name: "CREATEDON", order: "DESC" }],
        },
        {
          name: "IDX_INBOUNDEVENT_DOMAINID",
          fields: [{ name: "DOMAINID" }],
        },
        {
          name: "IDX_INBOUNDEVENT_INSTANCEID_INTERFACEID_BUSINESSEVENT_SOURCESYSTEM_TARGETSYSTEM",
          unique: true,
          fields: [
            { name: "INSTANCEID" },
            { name: "INTERFACEID" },
            { name: "BUSINESSEVENT" },
            { name: "SOURCESYSTEM" },
            { name: "TARGETSYSTEM" },
          ],
        },
        {
          name: "PRK_INBOUNDEVENT",
          unique: true,
          fields: [{ name: "TRANSACTIONID" }],
        },
      ],
    }
  );
};
