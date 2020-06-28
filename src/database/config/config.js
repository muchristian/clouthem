
module.exports = {
  development: {
    username: "postgres",
    password: "chris32",
    database: "chris_db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "chris32",
    database: "chris_db",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "chris_db",
    host: "127.0.0.1",
    dialect: "postgres"
  }
}
