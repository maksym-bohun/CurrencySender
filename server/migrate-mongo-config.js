const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports = {
  mongodb: {
    url: process.env.DATABASE,
    databaseName: "ExchangeRateSender",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
};
