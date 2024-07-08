const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userMailId: { type: Schema.Types.ObjectId, ref: "UserMail", required: true },
  title: { type: String, required: true },
  taskPeriod: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
