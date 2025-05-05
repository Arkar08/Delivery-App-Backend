import Users from "../models/userSchema.js";

export const getUser = async(req,res)=>{
    try {
        const findUser = await Users.find({})
        return res.status(200).json(findUser)
    } catch (error) {
        console.log(error)
    }
}


export const postUser = async(req,res)=>{
    try { 
        const {name,email,password,phone,role} = req.body;
        if(!name || !email || !password || !phone || !role){
            return res.status(404).json('Plz Filled Out in the Form Field.')
        }

        const newAddress = 'Yangon'
        const newLongitude = '16.871311'
        const newLatitude = '96.199379'
        
        const findEmail = await Users.findOne({email:email})
        if(!findEmail){
            const newUser =  await Users.create({
                name:name,
                email:email,
                password:password,
                phone:phone,
                role:role,
                address:newAddress,
                longitude:newLongitude,
                latitude:newLatitude
            })
            return res.status(201).json(newUser)
        }else{
            return res.status(400).json('Email is already exist.')
        }

        
    } catch (error) {
        console.log(error)
    }
}

export const getUserId = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('UserId does not exist.')
        }

        const findUserId = await Users.findOne({_id:id})
        if(!findUserId){
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(findUserId)
    } catch (error) {
        console.log(error)
    }
}

export const patchUser = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('UserId does not exist.')
        }
        const findUserId = await Users.findOne({_id:id})
        if(!findUserId){
            return res.status(404).json('Not Found')
        }else{

            const findUserEmail = await Users.findOne({email:req.body.email})
            if(!findUserEmail){
                const updateUser = await Users.findOneAndUpdate({_id:id},{...req.body})
            
                if(updateUser){
                    const findUser = await Users.findOne({_id:id})
                    return res.status(200).json(findUser)
                }
            }else{
                return res.status(400).json("User Name is already exist that cannot update this User Name.")
            }
          
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('UserId does not exist.')
        }
        const findUserId = await Users.findOne({_id:id})
        if(!findUserId){
            return res.status(404).json('Not Found')
        }else{
            const deleteUser = await Users.findOneAndDelete({_id:id})
            if(deleteUser){
                return res.status(200).json("Delete Successfully.")
            }else{
                return res.status(400).json("UserName cannot delete.")
            }
        }
    } catch (error) {
        console.log(error)
    }
}