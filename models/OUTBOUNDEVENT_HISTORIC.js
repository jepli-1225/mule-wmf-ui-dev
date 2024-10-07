const { Sequelize } = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OUTBOUNDEVENT_HISTORIC', {
    TRANSACTIONID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    BUSINESSEVENT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    OUTBOUNDCONTENT: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    STATUS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    INSTANCEID: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    INTERFACEID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TARGETSYSTEM: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DOMAINID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CREATEDBY: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CREATEDON: {
      type: DataTypes.DATE,
      allowNull: true
    },
    UPDATEDBY: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    UPDATEDON: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    tableName: 'OUTBOUNDEVENT_HISTORIC',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "NonClusteredIndex-20240411-174933",
        fields: [
          { name: "CREATEDON" },
        ]
      },
    ]
  });
};
