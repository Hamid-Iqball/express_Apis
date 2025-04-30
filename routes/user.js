const express = require("express")
const {handleGetAllUsers, handleGetUserById, handleUpdateUser, createUser} = require("../controllers/user")
const router = express.Router()


//get all users

router.route("/").get(handleGetAllUsers).post(createUser)



// Getting single user, updating and deleting a user.
router
.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUser)

module.exports = router