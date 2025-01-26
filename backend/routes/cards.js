const router = require("express").Router();
const Card = require("../models/Card");
const User = require("../models/User");

//カードを作成する
router.post("/:id/cards", async (req, res) => {
  const newCard = new Card(req.body);
  try {
    const savedCard = await newCard.save();
    await User.findByIdAndUpdate(req.params.id, {
      $push: { cards: [savedCard] },
    });

    return res.status(200).json(savedCard);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//カードを更新する
router.put("/:id/cards/:cardId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const user = await User.findOne({ _id: req.params.id });
    if (user._id.equals(card.creator._id)) {
      await card.updateOne({
        $set: req.body,
      });
      return res.status(200).json("カードの編集に成功しました");
    } else {
      return res.status(403).json("あなたは他の人のカードを編集できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//カードの削除
router.delete("/:id/cards/:cardId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const user = await User.findOne({ _id: req.params.id });
    if (user._id.equals(card.creator._id)) {
      await card.deleteOne();
      await user.updateOne({
        $pull: {
          cards: req.params.cardId,
        },
      });
      return res.status(200).json("カードの削除に成功しました");
    } else {
      return res.status(403).json("あなたは他の人のカードを削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//特定のユーザーのカードを取得する
router.get("/:id/cards", async (req, res) => {
  try {
    if (req.query.cardTitle) {
      const card = await Card.findOne({ cardTitle: req.query.cardTitle });
      return res.status(200).json(card);
    } else {
      const cards = await Card.find({ creator: req.params.id });
      return res.status(200).json(cards);
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//カードを取得する
router.get("/:id/cards/:cardId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    return res.status(200).json(card);
  } catch (err) {
    return res.status(403).json(err);
  }
});

module.exports = router;
