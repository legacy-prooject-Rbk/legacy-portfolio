const sequelize = require("./");
const User = require("../modules/user/model");
const Portfolio = require("../modules/portfolio/model");
const Interest = require("../modules/interest/model");
const SocialPlatform = require("../modules/SocialPlatform/model");

const users = require("../data/users.json");
const portfolios = require("../data/portfolios.json");
const interests = require("../data/interests.json");
const socialPlatforms = require("../data/SocialPlatforms.json");

(async () => {
  await (async () => {
    try {
      await User.bulkCreate(users);
      console.log("Users seeded successfully!!");
    } catch (error) {
      console.log("Users seeding Error!!", error);
    }
  })();

  await (async () => {
    try {
      await Portfolio.bulkCreate(portfolios);
      console.log("Users seeded successfully!!");
    } catch (error) {
      console.log("Users seeding Error!!", error);
    }
  })();

  await (async () => {
    try {
      await Interest.bulkCreate(interests);
      console.log("Users seeded successfully!!");
    } catch (error) {
      console.log("Users seeding Error!!", error);
    }
  })();

  await (async () => {
    try {
      await SocialPlatform.bulkCreate(socialPlatforms);
      console.log("Users seeded successfully!!");
    } catch (error) {
      console.log("Users seeding Error!!", error);
    }
  })();
})();
