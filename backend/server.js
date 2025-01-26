const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const cardRoute = require("./routes/cards");
const wordRoute = require("./routes/words");
const cors = require("cors");
const PORT = 5000;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionSuccessStatus: 200,
};

// データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });

// ミドルウェア
app.use("/images", express.static(path.join(__dirname, "public/imgs")));
app.use(express.json());
app.use("/api/users", cors(corsOptions), userRoute);
app.use("/api/auth", cors(corsOptions), authRoute);
app.use("/api/users", cors(corsOptions), cardRoute);
app.use("/api/users", cors(corsOptions), wordRoute);

app.get("/", (req, res) => {
  res.send("hello express");
});

// app.get("/users", (req, res) => {
//   res.send("users express");
// });

app.listen(PORT, () => console.log("サーバーが起動しました"));
