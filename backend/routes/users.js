const router = require("express").Router();
const User = require("../models/User");

//ユーザー情報の更新
router.put("/:id", async (req, res) => {
  if (req.body._id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("ユーザー情報が更新されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("権限がありません");
  }
});

//ユーザー情報の削除
router.delete("/:id", async (req, res) => {
  if (req.body._Id === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("権限がありません");
  }
});

// //ユーザー情報の取得
// router.get("/", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, updateAt, ...other } = user._doc;
//     return res.status(200).json(other);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//クエリでユーザー情報を取得
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    const { password, updateAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
