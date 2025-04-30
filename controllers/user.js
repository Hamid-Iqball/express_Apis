const User = require("../model/user")

//get all users
async function handleGetAllUsers(req, res){
    const allUsers  = await User.find({})
    return res.status(200).json(allUsers)
}

//get any user by Id
async function handleGetUserById(req,res){
    const user  =await User.findById(req.params.id)
    if(!user) {
        return res.status(401).json({msg:"User cannot be found"})
    }
    return res.status(200).json(user)
}


//uPDATE USER BY iD
async function handleUpdateUser(req,res){
    const user = await User.findByIdAndUpdate(req.params.id,{lastName:"Khan jan man"})  
  
    return res.status(200).json({msg:"success", user})
}


//Create User
const createUser = async (req,res)=>{
    // Request body
    const body = req.body

    // adding a few validations
    if(
        !body || 
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ){
        //Throw an error if there is any problem
        return res.status(400).json({msg:"All fields are required"})
    }

    try {
        const existuser = await User.findOne({email:body.email})
        if(existuser){
        return res.status(400).json({msg:"User with the same email already exists"}) 
        }
        
        //sending data to the database
        const result =  await User.create({
             firstName:body.firstName,
             lastName:body.lastName,
             email: body.email,
             gender:body.gender,
             jobTitle:body.jobTitle
         })
         console.log(result)
         return res.status(201).json({msg:"user created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"There is something wrong in server"})
    }
       
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    createUser
}