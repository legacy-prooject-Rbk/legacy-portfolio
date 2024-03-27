const router = require("express").Router();
const portfolioController = require("./controller");
const isAuthenticated = require("../../middlewares/authenticated");

router.post("/", isAuthenticated, portfolioController.create);
router.get("/", portfolioController.getAll);
router.post("/search", portfolioController.search);
// get portfolio of a user based on userId
router.get("/user/:userId", portfolioController.getUserPortfolio);

router.put("/:id", portfolioController.update);
router.delete("/:id", portfolioController.deleted);

module.exports = router;
