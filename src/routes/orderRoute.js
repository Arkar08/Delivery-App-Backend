import express from 'express'
import { deleteOrder, getOrder, getOrderCustomer, getOrderDelivery, getOrderId, patchOrder, postOrder } from '../controllers/orderController.js';
import { authorizeAdmin, authorizeCustomer, authorizeDelivery } from '../middleware/authMiddleware.js';


const route = express.Router()

route.get('/',authorizeAdmin,getOrder)
route.post('/',authorizeCustomer,postOrder)
route.get("/:id",getOrderId)
route.patch("/:id",authorizeDelivery,authorizeCustomer,patchOrder)
route.delete("/:id",authorizeAdmin,deleteOrder)

route.get("/find/:userId",authorizeCustomer,getOrderCustomer)
route.get("/find/:userId",authorizeDelivery,getOrderDelivery)


export default route;