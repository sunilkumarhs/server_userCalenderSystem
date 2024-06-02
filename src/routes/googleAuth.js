const express = require("express");
const googleAuthController = require("../controllers/googleAuth");
const isAuth = require("../middlewares/is-Auth");
const router = express.Router();

router.get("/googleAuth", googleAuthController.getGoogleAuthPage);
router.get("/googleCalender", googleAuthController.getGoogleCalenderPage);
router.get("/userInfo", isAuth, googleAuthController.getUserInfo);
router.get(
  "/schedule_event",
  googleAuthController.getGoogleCalenderSceduleEvent
);

module.exports = router;
