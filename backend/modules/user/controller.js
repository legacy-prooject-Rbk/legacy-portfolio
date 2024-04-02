const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const checkusername = await User.findOne({
        where: { username: username },
      });
      if (checkusername) {
      return   res.status(400).json({ error: "username already exist " });
      }

      const hashpassword = await bcrypt.hash(password, 10); /// this is  to encrypt your passsword

      const user = await User.create({
        username: username,
        password: hashpassword,
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(req.body);
      res.status(500).json(error);
    }
  },

  signin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        res.status(401).json("username not found ");
      }
      const passwordMatch = await bcrypt.compare(password, user.password); /// here to compare the input with the hashed password
      if (!passwordMatch) {
        res.status(401).json("incorrect password ");
      } else {
        const token = jwt.sign(
          {
            userId: user.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const payload = JSON.parse(atob(base64));
        console.log(payload);
        res.status(200).json({ payload, token, message: "succeeded" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // to test the authentication
  getAllUsers: async (req, res) => {
    try {
      const user = await User.findAll();
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
