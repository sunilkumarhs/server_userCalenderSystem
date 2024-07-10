const express = require("express");
const eventMethodsController = require("../controllers/eventMethods");
const isAuth = require("../middlewares/is-Auth");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/schedule_event_meet",
  isAuth,
  // [
  //   body("title").trim().isLength({ min: 5 }),
  //   body("description").trim().isLength({ min: 5 }),
  // ],
  eventMethodsController.getGoogleCalenderSceduleEventMeet
);
router.get(
  "/schedule_event",
  isAuth,
  eventMethodsController.getGoogleCalenderSceduleEvent
);
router.get(
  "/schedule_task",
  isAuth,
  eventMethodsController.getGoogleCalenderSceduleTask
);

module.exports = router;
