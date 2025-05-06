import http from 'http'
import app from './index.js'
import connectToDb from './db/connectToDb.js';


const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

server.listen(PORT,async()=>{
    await connectToDb();
    console.log(`server is running on Port ${PORT}`)
})