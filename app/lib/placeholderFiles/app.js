const sequelize = require("../sequelize-setup");
const DomainConfig = require("../../../models/domain");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const domainConfig = await DomainConfig.findAll({
      limit: 1,
      raw: true,
    });
    console.log("All the DOMAIN data:");
    console.log(JSON.stringify(domainConfig, null, 2));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
