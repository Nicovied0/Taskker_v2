const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  meetingUrl: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  status: {
    type: String,
    default: "Agendada",
  },
  diaryEvent: {
    type: Boolean,
    default: false,
  },
  usercreator: {
    type: String,
  },
  gridId: {
    type: Array,
    require: true,
  },
  daysOfRepeat: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
