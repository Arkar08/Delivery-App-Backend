import Category from "../models/categorySchema.js";
import Products from "../models/productSchema.js";

export const getProduct  = async(req,res)=>{
    try {
        const findProduct = await Products.find({})
        return res.status(200).json(findProduct)
    } catch (error) {
        console.log(error)
    }
}


export const postProduct = async(req,res)=>{
    try {
        const {title,category,description,image,price} = req.body;
        const findCategory = await Category.findOne({_id:category})
        if(!findCategory){
            return res.status(404).json("Category does not exist.")
        }
        if(!title  || !price){
            return res.status(404).json("Plz filled out in the form field.")
        }

        const newProduct = await Products.create({
            title:title,
            category:category,
            price:price,
            description:description,
            image:image
        })
        return res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
    }
}

export const getProductId = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('ProductId does not exist.')
        }

        const findProductId = await Products.findOne({_id:id})
        if(!findProductId){
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(findProductId)
    } catch (error) {
        console.log(error)
    }
}

export const patchProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('ProductId does not exist.')
        }
        const findProductId = await Products.findOne({_id:id})
        if(!findProductId){
            return res.status(404).json('Not Found')
        }else{

            const findProductName = await Products.findOne({title:req.body.title})
            if(!findProductName){
                const updateProduct = await Products.findOneAndUpdate({_id:id},{...req.body})
            
                if(updateProduct){
                    const findProduct = await Products.findOne({_id:id})
                    return res.status(200).json(findProduct)
                }
            }else{
                return res.status(400).json("Product Title is already exist that cannot update this Product Title.")
            }
          
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('ProductId does not exist.')
        }
        const findProductId = await Products.findOne({_id:id})
        if(!findProductId){
            return res.status(404).json('Not Found')
        }else{
            const deleteProduct = await Products.findOneAndDelete({_id:id})
            if(deleteProduct){
                return res.status(200).json("Delete Successfully.")
            }else{
                return res.status(400).json("productName cannot delete.")
            }
        }
    } catch (error) {
        console.log(error)
    }
}