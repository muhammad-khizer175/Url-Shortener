const mongoose = require("mongoose");

let urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamps: Number }],
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// url is the name of collection but named as urls the s is added by mongodb.
let URL = mongoose.model("url", urlSchema);

module.exports = URL;
