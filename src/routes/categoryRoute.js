import express from 'express'
import { deleteCategory, getCategory, getCategoryId, patchCategory, postCategory } from '../controllers/categoryController.js';
import { authorizeAdmin } from '../middleware/authMiddleware.js';

const route = express.Router()

route.get("/",getCategory)
route.post('/',authorizeAdmin,postCategory)
route.get("/:id",authorizeAdmin,getCategoryId)
route.patch("/:id",authorizeAdmin,patchCategory)
route.delete("/:id",authorizeAdmin,deleteCategory)

export default route;