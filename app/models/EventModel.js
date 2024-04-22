const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  event: {
    key: {
      type: String,
      required: true,
    },
    val: {
      type: String,
      required: true,
    },
  },
  city: {
    key: {
      type: String,
      required: true,
    },
    val: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Event", EventsSchema);
