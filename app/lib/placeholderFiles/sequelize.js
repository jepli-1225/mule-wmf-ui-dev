const sqlInstance = require("mssql");

const sqlConfig = {
  user: "MULE_READ",
  password: "MuleSoft2024",
  database: "mule_wmf_dev",
  server: "mulesoft-wmf-dev.cc28n9y16x01.ap-southeast-1.rds.amazonaws.com",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true,
  },
};

try {
  console.log("here! here!");
  sqlInstance.connect(sqlConfig).then(function () {
    new sqlInstance.Request()
      .query("select top(1) * from INTERFACECONFIG;")
      .then(function (dbData) {
        if (dbData == null || dbData.length === 0) return;
        console.dir("All the INTERFACECONFIG data.");
        console.dir(dbData);
      })
      .catch(function (error) {
        console.dir(error);
      });
  });
} catch (error) {
  console.dir(error);
}
