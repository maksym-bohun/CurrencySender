const { default: axios } = require("axios");
const { getDate } = require("../utils/getDate");
const Subscriber = require("../models/subscriberModel");
const catchAsync = require("../utils/catchAsync");
const nodemailer = require("nodemailer");

const getCurrentExchangeRateData = async () => {
  const date = getDate();
  const response = await axios.get(
    `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${date}&end=${date}&valcode=usd&sort=exchangedate&order=desc&json`
  );
  return response.data[0].rate;
};

exports.getCurrentExchangeRate = catchAsync(async (req, res, next) => {
  const rate = await getCurrentExchangeRateData();
  res.status(200).json({ rate });
});

exports.subscribe = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const subscriber = new Subscriber({ email });

  try {
    await subscriber.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log("ERROR CODE ", err.code);
    if (err.code === 11000) {
      res
        .status(500)
        .json({ status: "error", message: "Email is already used" });
    } else {
      next(err);
    }
  }
});

exports.sendMail = async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  try {
    const subscribers = await Subscriber.find();
    const rate = await getCurrentExchangeRateData();

    subscribers.forEach(async (subscriber) => {
      const info = await transporter.sendMail({
        from: "USD Rate Sender",
        to: subscriber.email,
        subject: "Current USD rate",
        text: `USD rate is ${rate}`,
      });
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log("ERROR ", err);
  }
};
