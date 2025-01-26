const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const Card = require("../models/Card");
const User = require("../models/User");
const Word = require("../models/Word");

//単語を作成する
router.post("/:id/cards/:cardId/words", async (req, res) => {
  const newWord = new Word(req.body);
  try {
    const savedWord = await newWord.save();
    await Card.findByIdAndUpdate(req.params.cardId, {
      $push: { words: [savedWord] },
    });
    return res.status(200).json(savedWord);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//単語を更新する
router.put("/:id/words/:wordId", async (req, res) => {
  try {
    const word = await Word.findById(req.params.wordId);
    const user = await User.findOne({ _id: req.params.id });
    if (user._id.equals(word.creator._id)) {
      await word.updateOne({
        $set: req.body,
      });
      return res.status(200).json("単語の編集に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の単語を編集できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//単語の削除
router.delete("/:id/words/:wordId", async (req, res) => {
  try {
    const word = await Word.findById(req.params.wordId);
    const user = await User.findOne({ _id: req.params.id });
    const card = await Card.findById(word.card);
    if (user._id.equals(word.creator._id)) {
      await word.deleteOne();
      await card.updateOne({ $pull: { words: req.params.wordId } });
      return res.status(200).json("単語の削除に成功しました");
    } else {
      return res.status(403).json("あなたは他の人の単語を削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

//単語を取得する
router.get("/:id/word", async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.query.word });
    return res.status(200).json(word);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//特定のカードの単語を取得する
router.get("/:id/words", async (req, res) => {
  try {
    const card = await Card.find({ cardTitle: req.query.cardTitle });
    const words = await Word.find({ card: card });
    return res.status(200).json(words);
  } catch (err) {
    return res.status(403).json(err);
  }
});

router.get("/:id/words/getFromWeblio", async (req, res) => {
  try {
    const URL = `http://ei-navi.jp/dictionary/content/${req.query.word}/`;
    const response = await axios(URL);
    const htmlParser = response.data;
    const $ = cheerio.load(htmlParser);
    let mainMeaning = "";
    $(".container")
      .children(".panel.summary")
      .find(".list-group-item-text")
      .each(function () {
        const newMeaning = $(this).find("a").text();
        if (mainMeaning.length === 0) {
          mainMeaning = newMeaning;
        } else {
          mainMeaning = mainMeaning + ", " + newMeaning;
        }
      });
    // .replaceAll("\n", "")
    // .replaceAll("\t", "");
    const pronSign = $(".meaning_wrap").find(".pronunciation-ipa").eq(0).text();
    const example = $(".example_wrap").find("ul").eq(0).find(".en").text();
    const exampleJpn = $(".example_wrap").find("ul").eq(0).find(".ja").text();
    const meaningSet = [];
    const getMeanings = async () => {
      const { nanoid } = await import("nanoid");
      $("#entry_group-wordnet", htmlParser)
        .find(".meaning_wrap")
        .children("section")
        .each(function () {
          const className = $(this).find(".pos").text();
          const meanings = [];
          $(this)
            .find(".wordnet-translations")
            .each(function () {
              let meaning = "";
              $(this)
                .find("span")
                .each(function () {
                  const newMeaning = $(this).text();
                  if (meaning.length === 0) {
                    meaning = newMeaning;
                  } else {
                    meaning = meaning + " " + newMeaning;
                  }
                });
              meanings.push({
                id: nanoid(),
                content: meaning,
              });
            });
          const CandM = {
            id: nanoid(),
            class: className,
            meanings: meanings,
          };
          meaningSet.push(CandM);
        });
    };
    await getMeanings();
    const data = {
      mainMeaning: mainMeaning,
      pronSign: pronSign,
      CandMs: meaningSet,
      example: example,
      exampleJpn: exampleJpn,
    };
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
