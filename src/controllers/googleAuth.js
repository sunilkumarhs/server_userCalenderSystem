const dotenv = require("dotenv");
dotenv.config();
const { v4: uuid } = require("uuid");
const { google } = require("googleapis");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const encryptData = require("../../utils/encryptData");

// const calender = google.calendar({
//   version: "v3",
//   auth: process.env.GOOGLE_CALENDER_API,
// });

const oauth2client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const scopes = [
  " https://www.googleapis.com/auth/userinfo.profile",
  " https://www.googleapis.com/auth/userinfo.email",
];

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
    const data = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
      },
    });
    if (data.status !== 200) {
      const error = new Error("Fetching of userInfo failed!!");
      error.statusCode = data.status;
      throw error;
    }
    const jsonData = await data.json();
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

// exports.getGoogleCalenderSceduleEventMeet = async (req, res, next) => {
//   console.log(req.body);
//   await calender.events.insert({
//     auth: oauth2client,
//     calendarId: "primary",
//     conferenceDataVersion: 1,
//     requestBody: {
//       summary: "This is test event!",
//       description: "some events are very important!",
//       start: {
//         dateTime: dayjs(new Date()).add(1, "day").toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//       conferenceData: {
//         createRequest: {
//           requestId: uuid(),
//         },
//       },
//       attendees: [{ email: "sunilkumarhs984586@gmail.com" }],
//     },
//   });
//   res.status(201).json({
//     message: "Post created successfully!",
//   });
// };

// exports.getGoogleCalenderSceduleEvent = async (req, res, next) => {
//   await calender.events.insert({
//     auth: oauth2client,
//     calendarId: "primary",
//     requestBody: {
//       summary: "This is test event!",
//       description: "some events are very important!",
//       start: {
//         dateTime: dayjs(new Date()).add(1, "day").toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//     },
//   });
//   res.send({ msg: "done" });
// };

// exports.getGoogleCalenderSceduleTask = async (req, res, next) => {
//   await calender.events.insert({
//     auth: oauth2client,
//     calendarId: "primary",
//     requestBody: {
//       summary: "This is test event!",
//       description: "some events are very important!",
//       start: {
//         dateTime: dayjs(new Date()).add(1, "day").toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: dayjs(new Date()).add(1, "day").add(1, "hour").toISOString(),
//         timeZone: "Asia/Kolkata",
//       },
//     },
//   });
//   res.send({ msg: "done" });
// };
