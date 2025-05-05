import express from 'express'
import { deleteRating, getRating, getRatingId, patchRating, postRating } from '../controllers/ratingController.js';


const route = express.Router()

route.get('/',getRating)
route.post('/',postRating)
route.get('/:id',getRatingId)
route.patch('/:id',patchRating)
route.delete('/:id',deleteRating)

export default route;