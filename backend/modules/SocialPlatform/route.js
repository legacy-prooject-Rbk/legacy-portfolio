const router = require("express").Router();
const { getAll, addContact } = require("./controller");

router.get("/", getAll);
router.post("/user/:UserId", addContact);

module.exports = router;
