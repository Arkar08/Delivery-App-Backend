import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    orderNo:{
        type:String,
        require:true
    },
    productLists:[
        {
            productName:{
                type:String
            },
            price:{
                type:Number
            }
        }
    ],
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        require:true
    },
    deliveryMen:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        require:true
    },
    totalAmount:{
        type:Number,
        require:true
    },
    payment:{
        type:String,
        enums:['Cash','Bank'],
        require:true
    },
    status:{
        type:String,
        default:"Pending",
        enums:['Pending','Paid','Cancelling','Deliverying']
    }
},{timestamps:true})

const Orders = mongoose.model("Orders",orderSchema)


export default Orders;