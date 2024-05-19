const express = require("express");
const subscriberController = require("../controllers/subscriberController");

const router = express.Router();

router.get("/rate", subscriberController.getCurrentExchangeRate);
router.post("/subscribe", subscriberController.subscribe);

module.exports = router;
