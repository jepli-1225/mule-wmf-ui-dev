import { Sequelize } from "sequelize";
import initModels from "@/models/init-models";

const sequelize = new Sequelize("mule_wmf_dev", "MULE_READ", "MuleSoft2024", {
  host: "mulesoft-wmf-dev.cc28n9y16x01.ap-southeast-1.rds.amazonaws.com",
  dialect: "mssql",
  logging: false,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  },
  pool: {
    max: 10,
    min: 0,
    idle: 30000,
  },
});

const models = initModels(sequelize);

export default models;
