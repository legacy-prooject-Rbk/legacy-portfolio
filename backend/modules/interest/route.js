const router = require("express").Router();
const InterestController = require("./controller");

router.get("/", InterestController.getAll);
router.route("/user/:UserId").post(InterestController.setInterests);

module.exports = router;
