import express from 'express'
import { deleteOrder, getOrder, getOrderId, patchOrder, postOrder } from '../controllers/orderController.js';


const route = express.Router()

route.get('/',getOrder)
route.post('/',postOrder)
route.get("/:id",getOrderId)
route.patch("/:id",patchOrder)
route.delete("/:id",deleteOrder)


export default route;