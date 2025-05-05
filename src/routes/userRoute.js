import express from 'express'
import { deleteUser, getUser, getUserId, patchUser, postUser } from '../controllers/userController.js'



const route = express.Router()

route.get('/',getUser)
route.post('/',postUser)
route.get('/:id',getUserId)
route.patch("/:id",patchUser)
route.delete("/:id",deleteUser)

export default route;