require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "123456",
    database: "testkn",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    define: {
      freezeTableName: false,
    },
    timezone: "+07:00",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },

  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
