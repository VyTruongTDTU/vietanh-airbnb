const mongoose = require("mongoose");

const hostSchema = new mongoose.Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
      },
      response_time: {
            type: String,
            default: "within a few hours"
      }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Host", hostSchema);