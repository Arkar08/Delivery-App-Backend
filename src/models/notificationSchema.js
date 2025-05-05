import mongoose from "mongoose";


const notificationSchema = mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        require:true
    },
    title:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    is_read:{
        type:Boolean
    }
},{timestamps:true})


const Notification = mongoose.model("Notification",notificationSchema)

export default Notification;