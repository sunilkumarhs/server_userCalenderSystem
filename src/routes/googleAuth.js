const express = require("express");
const googleAuthController = require("../controllers/googleAuth");
const router = express.Router();

router.get("/googleAuth", googleAuthController.getGoogleAuthPage);
router.get("/googleCalender", googleAuthController.getGoogleCalenderPage);
router.get(
  "/schedule_event",
  googleAuthController.getGoogleCalenderSceduleEvent
);

module.exports = router;
