import Category from "../models/categorySchema.js";

export const getCategory = async(req,res)=>{
    try {
        const findData = await Category.find({})
        return res.status(200).json(findData)
    } catch (error) {
        console.log(error)
    }
}


export const postCategory = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(404).json("Plz filled out in the form field.")
        }
        const findCategory = await Category.findOne({name:name})
        if(!findCategory){
            const newCategory = await Category.create({
                name:name
            })
            return res.status(201).json(newCategory)
        }else{
            return res.status(400).json("Category is already exist.")
        }
    } catch (error) {
        console.log(error)
    }
}


export const getCategoryId = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('CategoryId does not exist.')
        }

        const findCategoryId = await Category.findOne({_id:id})
        if(!findCategoryId){
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(findCategoryId)
    } catch (error) {
        console.log(error)
    }
}

export const patchCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('CategoryId does not exist.')
        }
        const findCategoryId = await Category.findOne({_id:id})
        if(!findCategoryId){
            return res.status(404).json('Not Found')
        }else{

            const findCategoryName = await Category.findOne({name:req.body.name})
            if(!findCategoryName){
                const updateCategory = await Category.findOneAndUpdate({_id:id},{...req.body})
            
                if(updateCategory){
                    const findCategory = await Category.findOne({_id:id})
                    return res.status(200).json(findCategory)
                }
            }else{
                return res.status(400).json("Category Name is already exist that cannot update this Category Name.")
            }
          
        }

    } catch (error) {
        console.log(error)
    }
}

export const deleteCategory = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('CategoryId does not exist.')
        }
        const findCategoryId = await Category.findOne({_id:id})
        if(!findCategoryId){
            return res.status(404).json('Not Found')
        }else{
            const deleteCategory = await Category.findOneAndDelete({_id:id})
            if(deleteCategory){
                return res.status(200).json("Delete Successfully.")
            }else{
                return res.status(400).json("categoryName cannot delete.")
            }
        }
    } catch (error) {
        console.log(error)
    }
}