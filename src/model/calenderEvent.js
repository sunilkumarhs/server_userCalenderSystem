const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  userMailId: { type: Schema.Types.ObjectId, ref: "UserMail", required: true },
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  guests: [{ email: { type: String }, isOptional: { type: Boolean } }],
  meetingId: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Event", eventSchema);
