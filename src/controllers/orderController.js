import Orders from "../models/orderSchema.js";

export const getOrder = async(req,res)=>{
    try {
        const findOrder = await Orders.find({})
        return res.status(200).json(findOrder)
    } catch (error) {
        console.log(error)
    }
}

export const postOrder = async(req,res)=>{
    try {
        const {customer,deliveryMen,productLists,totalAmount,payment} = req.body;

        if(!totalAmount || productLists.length === 0 ){
            return res.status(404).json("Plz filled out in the form field.")
        }

        const lastOrder = await Orders.find()

        const orderId = Number(lastOrder[lastOrder.length - 1].orderNo.slice(8))? Number(lastOrder[lastOrder.length - 1].orderNo.slice(8)) + 1 : 1
        const voucherId = (number) => {
            let string = '';
            let modifyNumber = 6 - number
            for(let i = 0; i< modifyNumber ; i++){
                string = string + '0'
            }
            return string;
        }
        const orderNo = `OrderNo-${voucherId(orderId.toString().length)+orderId.toString()}` ;
        
        const newOrder = await Orders.create({
            orderNo:orderNo,
            customer:customer,
            deliveryMen:deliveryMen,
            productLists:productLists,
            totalAmount:totalAmount,
            payment:payment
        })
        return res.status(201).json(newOrder)
    } catch (error) {
        console.log(error)
    }
}

export const getOrderId = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('OrderId does not exist.')
        }

        const findOrderId = await Orders.findOne({_id:id})
        if(!findOrderId){
            return res.status(404).json('Not Found')
        }
        return res.status(200).json(findOrderId)
    } catch (error) {
        console.log(error)
    }
}


export const patchOrder = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('OrderId does not exist.')
        }
        const findOrderId = await Orders.findOne({_id:id})
        if(!findOrderId){
            return res.status(404).json('Not Found')
        }else{
                const updateOrder = await Orders.findOneAndUpdate({_id:id},{...req.body})
            
                if(updateOrder){
                    const findOrder = await Orders.findOne({_id:id})
                    return res.status(200).json(findOrder)
                }
        }
    } catch (error) {
        console.log(error)
    }
}


export const deleteOrder = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!parseInt(id)){
            return res.status(404).json('OrderId does not exist.')
        }
        const findOrderId = await Orders.findOne({_id:id})
        if(!findOrderId){
            return res.status(404).json('Not Found')
        }else{
            const deleteOrder = await Orders.findOneAndDelete({_id:id})
            if(deleteOrder){
                return res.status(200).json("Delete Successfully.")
            }else{
                return res.status(400).json("orderName cannot delete.")
            }
        }
    } catch (error) {
        console.log(error)
    }
}