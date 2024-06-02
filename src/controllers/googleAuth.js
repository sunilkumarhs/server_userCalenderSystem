const dotenv = require("dotenv");
dotenv.config();
const { v4: uuid } = require("uuid");
const { google } = require("googleapis");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const encryptData = require("../../utils/encryptData");

const calender = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_CALENDER_API,
});

const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];
let tokensset;

exports.getGoogleAuthPage = (req, res, next) => {
  try {
    const url = oauth2client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });
    res.redirect(url);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getGoogleCalenderPage = async (req, res, next) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);
    tokensset = tokens;
    const token = tokens.access_token;
    const expries = tokens.expiry_date;
    const jwtToken = jwt.sign(
      { token: token, expries: expries },
      process.env.SECRECT_WORD,
      { expiresIn: "1h" }
    );
    const encToken = encryptData(jwtToken);
    res.redirect(`http://localhost:3000?token=${encToken}`);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    console.log(tokensset);
    const data = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${req.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!data) {
      const error = new Error("Fetching of userInfo failed!!");
      error.statusCode = 404;
      throw error;
    }
    const jsonData = await data.json();
    console.log(jsonData);
    if (!jsonData) {
      const error = new Error("Fetching of userInfo failed!!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "UserInfo fetched successfully!",
      userInfo: jsonData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getGoogleCalenderSceduleEvent = async (req, res, next) => {
  await calender.events.insert({
    auth: oauth2client,
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: "This is test event!",
      description: "some events are very important!",
      start: {
        dateTime: dayjs(new Date()).add(1, "day").toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: uuid(),
        },
      },
      attendees: [{ email: "sunilkumarhs984586@gmail.com" }],
    },
  });
  res.send({ msg: "done" });
};
