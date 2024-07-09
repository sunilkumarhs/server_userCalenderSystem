const express = require("express");
const googleAuthController = require("../controllers/googleAuth");
const isAuth = require("../middlewares/is-Auth");
const router = express.Router();

router.get("/googleAuth", googleAuthController.getGoogleAuthPage);
router.get("/googleCalender", googleAuthController.getGoogleCalenderPage);
router.get("/userInfo", isAuth, googleAuthController.getUserInfo);
router.get(
  "/schedule_event_meet",
  googleAuthController.getGoogleCalenderSceduleEventMeet
);
router.get(
  "/schedule_event",
  googleAuthController.getGoogleCalenderSceduleEvent
);
router.get("/schedule_task", googleAuthController.getGoogleCalenderSceduleTask);

module.exports = router;
