import express from 'express'
import { deleteOrder, getOrder, getOrderId, patchOrder, postOrder } from '../controllers/orderController.js';
import { authorizeAdmin, authorizeCustomer, authorizeDelivery } from '../middleware/authMiddleware.js';


const route = express.Router()

route.get('/',getOrder)
route.post('/',authorizeCustomer,postOrder)
route.get("/:id",getOrderId)
route.patch("/:id",authorizeDelivery,authorizeCustomer,patchOrder)
route.delete("/:id",authorizeAdmin,deleteOrder)


export default route;