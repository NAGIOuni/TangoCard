const mongoose = require("mongoose");
const { Schema } = mongoose;

const wordSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
    },
    meanings: [
      {
        id: {
          type: String,
          required: true,
          unique: true,
        },
        class: {
          type: String,
          required: true,
        },
        meanings: [
          {
            id: {
              type: String,
              required: true,
              unique: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    img: {
      type: String,
      default: "",
    },
    state: {
      type: Number,
      default: 0,
    },
    example: {
      type: String,
    },
    exampleJpn: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
    pronunciation: {
      sign: {
        type: String,
        required: true,
      },
      sound: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Word", wordSchema);
