import express from 'express'
import { deleteProduct, getProduct, getProductId, patchProduct, postProduct } from '../controllers/productController.js';
import { authorizeAdmin } from '../middleware/authMiddleware.js';


const route = express.Router()

route.get("/",getProduct)
route.post('/',authorizeAdmin,postProduct)
route.get("/:id",getProductId)
route.patch("/:id",authorizeAdmin,patchProduct)
route.delete("/:id",authorizeAdmin,deleteProduct)


export default route;