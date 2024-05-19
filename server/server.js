const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cron = require("node-cron");
const subscriberController = require("./controllers/subscriberController");
const migrateMongo = require("migrate-mongo");
const app = require("./app.js");

dotenv.config({ path: "./config.env" });

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
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
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

cron.schedule("0 16 * * *", () => {
  subscriberController.sendMail();
});
