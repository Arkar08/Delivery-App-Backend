
import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import orderRoute from './routes/orderRoute.js'
import productRoute from './routes/productRoute.js'
import ratingRoute from './routes/ratingRoute.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'

dotenv.config();

const app = express()

app.use(express.json())
app.use(errorMiddleware)

app.get('/',(req,res)=>{
    return res.json('Hello world')
})


// routes

app.use('/api/v1/user',userRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/order',orderRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/rating',ratingRoute)

export default app;