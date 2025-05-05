import Rating from "../models/ratingSchema.js";

export const getRating = async(req,res)=>{
    try {
        const findRating = await Rating.find({})
        return res.status(200).json(findRating)
    } catch (error) {
        console.log(error)
    }
}

export const postRating = async(req,res)=>{
    try {
        const {orderId,rating,comments} = req.body;

        const newRating = await Rating.create({
            orderId:orderId,
            rating:rating,
            comments:comments
        })
        return res.status(201).json(newRating)
    } catch (error) {
        console.log(error)
    }
}

export const getRatingId = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('RatingId does not exist.')
        }

        const findRatingId = await Rating.findOne({_id:id})
        if(!findRatingId){
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(findRatingId)
    } catch (error) {
        console.log(error)
    }
}

export const patchRating = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('RatingId does not exist.')
        }
        const findRating = await Rating.findOne({_id:id})
        if(!findRating){
            return res.status(404).json('Not Found')
        }else{

            
                const updateRating = await Rating.findOneAndUpdate({_id:id},{...req.body})
            
                if(updateRating){
                    const findRating = await Rating.findOne({_id:id})
                    return res.status(200).json(findRating)
                }
          
        }
    } catch (error) {
        console.log(error)
    }
}


export const deleteRating = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('RatingId does not exist.')
        }
        const findRatingId = await Rating.findOne({_id:id})
        if(!findRatingId){
            return res.status(404).json('Not Found')
        }else{
            const deleteRating = await Rating.findOneAndDelete({_id:id})
            if(deleteRating){
                return res.status(200).json("Delete Successfully.")
            }else{
                return res.status(400).json("Rating cannot delete.")
            }
        }
    } catch (error) {
        console.log(error)
    }
}