const SocialPlatform = require("./model");
const Portfolio = require("../portfolio/model");

const getAll = async (req, res) => {
  try {
    const platforms = await SocialPlatform.findAll();
    res.send(platforms);
  } catch (error) {
    console.log(error);
    req.status(404).send("404");
  }
};

const addContact = async (req, res) => {
  try {
    const { UserId } = req.params;
    const { platformId, value } = req.body;

    const portfolio = await Portfolio.findOne({ where: { UserId } });

    await portfolio.addContact(platformId, { through: { value } });

    res.send("Contact Added Successfully.");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { getAll, addContact };
