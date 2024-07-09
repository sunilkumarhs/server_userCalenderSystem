const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  userMailId: { type: Schema.Types.ObjectId, ref: "UserMail", required: true },
  title: { type: String, required: true },
  startTime: { type: Object, required: true },
  endTime: { type: Object, required: true },
  guests: [{ type: Object }],
  meetingId: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
