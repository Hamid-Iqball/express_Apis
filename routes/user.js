const express = require("express")
const router = express.Router()

const {handleGetAllUsers, handleGetUserById, handleUpdateUser, createUser} = require("../controllers/user")


//get all users
router.get("/", handleGetAllUsers)


//Creating users
router.post("/", createUser)


// Getting single user, updating and deleting a user.
router.route(":id").get(handleGetUserById).patch(handleUpdateUser)

module.exports = router