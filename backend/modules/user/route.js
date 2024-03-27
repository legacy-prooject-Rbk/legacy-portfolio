const express = require("express")
const router = express.Router()
const { createUser, signin, getAllUsers } = require("./controller")

const isAuthenticated = require("../../middlewares/authenticated")

router.post("/signup", createUser)
router.post("/signin", signin)
router.get("/", isAuthenticated, getAllUsers)



module.exports = router