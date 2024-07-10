const dotenv = require("dotenv");
dotenv.config();
const { v4: uuid } = require("uuid");
const { google } = require("googleapis");
const dayjs = require("dayjs");
const { validationResult } = require("express-validator");

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

exports.getGoogleCalenderSceduleEventMeet = async (req, res, next) => {
  console.log(req.body);
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const error = new Error(
  //       "Validation of Post is failed!!, entered data is incorrect!!"
  //     );
  //     error.statusCode = 422;
  //     throw error;
  //   }
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
  res.status(201).json({
    message: "Post created successfully!",
  });
};

exports.getGoogleCalenderSceduleEvent = async (req, res, next) => {
  await calender.events.insert({
    auth: oauth2client,
    calendarId: "primary",
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
    },
  });
  res.send({ msg: "done" });
};

exports.getGoogleCalenderSceduleTask = async (req, res, next) => {
  await calender.events.insert({
    auth: oauth2client,
    calendarId: "primary",
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
    },
  });
  res.send({ msg: "done" });
};
