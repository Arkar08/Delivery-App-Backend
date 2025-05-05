import express from 'express'
import { deleteProduct, getProduct, getProductId, patchProduct, postProduct } from '../controllers/productController.js';


const route = express.Router()

route.get("/",getProduct)
route.post('/',postProduct)
route.get("/:id",getProductId)
route.patch("/:id",patchProduct)
route.delete("/:id",deleteProduct)


export default route;