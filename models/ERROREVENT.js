const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ERROREVENT",
    {
      ERRORID: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.fn("newsequentialid"),
        primaryKey: true,
      },
      ERRORTITLE: {
        type: DataTypes.STRING(4000),
        allowNull: true,
        defaultValue: "",
      },
      ERRORDETAIL: {
        type: DataTypes.STRING(4000),
        allowNull: true,
        defaultValue: "",
      },
      ERRORCONTENT: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      STATUS: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      RELATEDINBOUNDINSTANCE: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "INBOUNDEVENT",
          key: "TRANSACTIONID",
        },
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
      tableName: "ERROREVENT",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "PRK_ERROREVENT",
          unique: true,
          fields: [{ name: "ERRORID" }],
        },
      ],
    }
  );
};
