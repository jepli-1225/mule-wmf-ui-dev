const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "INBOUNDEVENT_HISTORIC",
    {
      TRANSACTIONID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      INBOUNDCONTENT: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      STATUS: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      INTERFACEID: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      SOURCESYSTEM: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      INSTANCEID: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      BUSINESSEVENT: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      INBOUNDPROPERTIES: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      DOMAINID: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      TARGETSYSTEM: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CREATEDBY: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CREATEDON: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      UPDATEDBY: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      UPDATEDON: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: "INBOUNDEVENT_HISTORIC",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "NonClusteredIndex-20240411-174909",
          fields: [{ name: "CREATEDON" }],
        },
      ],
    }
  );
};
