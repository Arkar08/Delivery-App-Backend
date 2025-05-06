import express from 'express'
import { deleteUser, getUser, getUserId, loginUser, logout, patchUser, postUser, signUpUser } from '../controllers/userController.js'



const route = express.Router()

route.get('/',getUser)
route.post('/',postUser)
route.get('/:id',getUserId)
route.patch("/:id",patchUser)
route.delete("/:id",deleteUser)
route.post("/signup",signUpUser)
route.post("/login",loginUser)
route.post("/logout",logout)

export default route;