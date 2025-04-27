const express  = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 8000

app.use(express.json())


// 1.mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/project-express-1")
.then(()=>console.log('MongoDB connected'))
.catch(()=>console.log("Mongo Error"))


//2.schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String
    },

},
{timestamps:true})

//3.Modal
const User = mongoose.model("user",userSchema)

//Routes

//get all users
app.get("/api/users", async (req , res)=>{
    const allUsers  = await User.find({})
    return res.status(200).json(allUsers)
})


//Creating users
app.post("/api/users", async (req,res)=>{
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
       
})


// Getting single user, updating and deleting a user.
app.route("/api/user/:id").get(async(req,res)=>{
    const user  =await User.findById(req.params.id)
    if(!user) {
        return res.status(401).json({msg:"User cannot be found"})
    }

    return res.status(200).json(user)
    }

).patch(async(req,res)=>{
      const user = await User.findByIdAndUpdate(req.params.id,{lastName:"Khan"})  


return res.status(200).json({msg:"success"}).json(user)


})





app.listen(PORT, ()=>console.log("Server has started port 8000"))