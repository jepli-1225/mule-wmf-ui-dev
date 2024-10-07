const { Sequelize } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Delete_Metrics",
    {
      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Records: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CompletionTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Delete_Metrics",
      schema: "dbo",
      timestamps: false,
      indexes: [
        {
          name: "IX_EndDate",
          fields: [{ name: "EndDate" }],
        },
        {
          name: "IX_StartDate",
          fields: [{ name: "StartDate" }],
        },
      ],
    }
  );
};
