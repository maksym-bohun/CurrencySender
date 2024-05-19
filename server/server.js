const express = require("express");
const dotenv = require("dotenv");
const exchangeRateRoutes = require("./routes/exchangeRateRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const subscriberController = require("./controllers/subscriberController");
const migrateMongo = require("migrate-mongo");

dotenv.config({ path: "./config.env" });

const app = express();
const jsonParser = bodyParser.json();

app.use(bodyParser.json({ limit: "20mb" }));

async function runMigrations() {
  const config = require("./migrate-mongo-config.js");
  migrateMongo.config.set(config);

  const { db, client } = await migrateMongo.database.connect();
  try {
    const pendingMigrations = await migrateMongo.status(db);
    if (pendingMigrations.some((m) => m.appliedAt === "PENDING")) {
      const migrationResult = await migrateMongo.up(db, client);
      console.log("Migrations completed:", migrationResult);
    } else {
      console.log("No pending migrations.");
    }
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  } finally {
    client.close();
  }
}

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
    await runMigrations();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

app.use("/api", jsonParser, exchangeRateRoutes);

cron.schedule("0 16 * * *", () => {
  subscriberController.sendMail();
});
