import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pg from 'pg'
import cookieParser from 'cookie-parser'
dotenv.config()
const {Pool} = pg
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


import postRouter from './routes/postRoutes.js'
import userRouter from './routes/userRoutes.js'

app.use('/api/posts' , postRouter)
app.use('/api/user' , userRouter)



const pool = new Pool

pool.connect((err , client , done) => {
    if(err){
        console.log(`error connecting to database` , err)
    } else {
        console.log(`connected to database`)
    }
    done()
})

const PORT = process.env.PORT || 4000

app.listen(PORT , () => {
    console.log(`server started on port ${PORT}`)
})


export default app