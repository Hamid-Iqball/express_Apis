
const User  =require("../model/user")
async function handleGetAllUsers(){
    const allUsers  = await User.find({})
    return res.status(200).json(allUsers)
}


module.exports={
    handleGetAllUsers
}