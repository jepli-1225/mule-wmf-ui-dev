const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ERROREVENT_HISTORIC",
    {
      ERRORID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ERRORTITLE: {
        type: DataTypes.STRING(4000),
        allowNull: true,
      },
      ERRORDETAIL: {
        type: DataTypes.STRING(4000),
        allowNull: true,
      },
      ERRORCONTENT: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      STATUS: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      RELATEDINBOUNDINSTANCE: {
        type: DataTypes.UUID,
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
      tableName: "ERROREVENT_HISTORIC",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "NonClusteredIndex-20240411-174838",
          fields: [{ name: "CREATEDON" }],
        },
      ],
    }
  );
};
