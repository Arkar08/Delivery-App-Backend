import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    }
},{timstamps:true})

const Category = mongoose.model('Category',categorySchema)

export default Category;