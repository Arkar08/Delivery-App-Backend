import mongoose from "mongoose";

const connectToDb = async()  =>{
    try {
       await mongoose.connect(process.env.MONGO_URL).then((data)=>{
        console.log('db is connected.')
       }).catch((error)=>{
            console.log('db is not connected')
       })
    } catch (error) {
        console.log('db is not connected')
    }
}

export default connectToDb;