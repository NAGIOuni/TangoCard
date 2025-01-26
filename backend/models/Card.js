const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cardTitle: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 200,
    },
    likes: {
      type: Array,
      default: [],
    },
    words: [
      {
        type: Schema.Types.ObjectId,
        ref: "Word",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
