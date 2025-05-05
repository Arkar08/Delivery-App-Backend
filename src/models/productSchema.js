import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Category",
        require:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        require:true
    }

},{timestamps:true})


const Products = mongoose.model("Products",productSchema)


export default Products;