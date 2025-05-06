import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    address:{
        type:String,
    },
    longitude:{
        type:String
    },
    latitude:{
        type:String
    },
    role:{
        type:String,
        enums:['Admin','Delivery','Customer'],
        require:true
    },
    createdDate:{
        type:Date,
        default:Date.now()
    }
})


const Users = mongoose.model('Users',userSchema)

export default Users;