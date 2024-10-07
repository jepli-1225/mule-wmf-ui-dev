const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "DOMAIN",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      DOMAINID: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "",
      },
      DOMAINDESCRIPTION: {
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
    },
    {
      sequelize,
      tableName: "DOMAIN",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "IDX_DOMAIN_DOMAINID",
          unique: true,
          fields: [{ name: "DOMAINID" }],
        },
        {
          name: "PRK_DOMAIN",
          unique: true,
          fields: [{ name: "ID" }],
        },
      ],
    }
  );
};
