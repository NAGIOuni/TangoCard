const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 25,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      mim: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 70,
    },
    occupation: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
