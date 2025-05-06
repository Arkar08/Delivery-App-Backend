import mongoose from "mongoose";


const ratingSchema = mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Orders",
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        require:true
    },
    rating:{
        type:Number,
    },
    comments:{
        type:String
    }
},{timestamps:true})


const Rating = mongoose.model("Rating",ratingSchema)

export default Rating;