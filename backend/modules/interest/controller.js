const Interest = require("./model");
const Portfolio = require("../portfolio/model");

const getAll = async (req, res) => {
  try {
    const interests = await Interest.findAll();
    res.send(interests);
  } catch (error) {
    console.log(error);
    req.status(404).send("404");
  }
};

const setInterests = async (req, res) => {
  try {
    const { UserId } = req.params;
    const { interests } = req.body;
    const portfolio = await Portfolio.findOne({ where: { UserId } });

    interests.forEach(async (item) => {
      await portfolio.addInterest(item);
    });

    res.send('Interresrs Added Successfully.');
  } catch (error) {
    console.log(error);
    req.status(404).send("404");
  }
};

module.exports = { getAll, setInterests };
