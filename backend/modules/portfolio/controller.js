const User = require("../user/model");
const Portfolio = require("./model");
const { Op } = require("sequelize");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//handleUpload is a helper function that accepts a file and attempts to upload the file
const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};

const create = async (req, res) => {
  try {
    const { userId } = req;

    //process photo
    // deconstruct request files
    const [photo, backgroundImage] = req.files;
    // reconstruct buffer to base64
    const b64 = Buffer.from(photo.buffer).toString("base64");
    let dataURI1 = "data:" + photo.mimetype + ";base64," + b64;
    //send photo to cloudinary server
    let photoUpload = await handleUpload(dataURI1);

    //process backgroundImage
    const b64Image = Buffer.from(backgroundImage.buffer).toString("base64");
    let dataURI2 = "data:" + photo.mimetype + ";base64," + b64Image;
    let ImageUpload = await handleUpload(dataURI2);

    const { fullName, email, profession, bio, city } = req.body;
    const portfolio = await Portfolio.create({
      fullName,
      email,
      profession,
      bio,
      city,
      photo: photoUpload.secure_url,
      backgroundImage: ImageUpload.secure_url,
    });
    const user = await User.findByPk(userId);
    await user.setPortfolio(portfolio);
    console.log(portfolio);
    res.status(201).json(portfolio);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await Portfolio.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const search = async (req, res) => {
  try {
    const { query, city } = req.body;

    let whereCondition = {};

    if (query) {
      whereCondition = {
        // the result should match any of the conditions inside the array
        [Op.or]: [
          { fullName: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { profession: { [Op.like]: `%${query}%` } },
          { bio: { [Op.like]: `%${query}%` } },
        ],
      };
    }

    if (city) {
      whereCondition.city = city;
    }
    if (!query && !city) {
      return res
        .status(400)
        .json({ message: "No search query or city provided" });
    }

    const portfolios = await Portfolio.findAll({
      where: whereCondition,
      include: [
        { association: "Interests", attributes: ["name", "id"] },
        { association: "Contacts" },
      ],
    });

    res.status(200).json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    let [photo, backgroundImage] = req.files;
    const { id } = req.params;
    const { fullName, email, profession, bio } = req.body;
    if (photo) {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      let dataURI1 = "data:" + photo.mimetype + ";base64," + b64;
      let photoUpload = await handleUpload(dataURI1);

      photo = photoUpload.secure_url;
      const result = await Portfolio.update({ photo }, { where: { id: id } });
    }
    if (backgroundImage) {
      const b64 = Buffer.from(backgroundImage.buffer).toString("base64");
      let dataURI1 = "data:" + backgroundImage.mimetype + ";base64," + b64;
      let photoUpload = await handleUpload(dataURI1);

      backgroundImage = photoUpload.secure_url;
      const result = await Portfolio.update(
        { backgroundImage },
        { where: { id: id } }
      );
    }
    const result = await Portfolio.update(
      { fullName, email, profession, bio },
      { where: { id: id } }
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(201).send(error);
  }
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Portfolio.destroy({ where: { id: id } });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getUserPortfolio = async (req, res) => {
  try {
    // retrieve userId from url params
    const { userId } = req.params;
    // get the corresponding portfolio
    const result = await Portfolio.findOne({
      where: { userId: userId },
      include: [
        { association: "Interests", attributes: ["name", "id"] },
        { association: "Contacts" },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = { create, getAll, update, deleted, search, getUserPortfolio };
