import express from 'express'
import { deleteUser, getUser, getUserId, loginUser, logout, patchUser, postUser, signUpUser } from '../controllers/userController.js'
import { authMiddleware, authorizeAdmin } from '../middleware/authMiddleware.js'



const route = express.Router()

route.get('/',authMiddleware,getUser)
route.post('/',authMiddleware,authorizeAdmin,postUser)
route.get('/:id',authMiddleware,getUserId)
route.patch("/:id",authMiddleware,patchUser)
route.delete("/:id",authMiddleware,deleteUser)
route.post("/signup",signUpUser)
route.post("/login",loginUser)
route.post("/logout",logout)

export default route;