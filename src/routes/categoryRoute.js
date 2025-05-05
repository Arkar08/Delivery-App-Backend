import express from 'express'
import { deleteCategory, getCategory, getCategoryId, patchCategory, postCategory } from '../controllers/categoryController.js';

const route = express.Router()

route.get("/",getCategory)
route.post('/',postCategory)
route.get("/:id",getCategoryId)
route.patch("/:id",patchCategory)
route.delete("/:id",deleteCategory)

export default route;