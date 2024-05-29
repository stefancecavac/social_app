import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pg from 'pg'
import cookieParser from 'cookie-parser'
dotenv.config()
const {Pool} = pg
const app = express()



app.use(cors())
app.use(express.json())
app.use(cookieParser())


import postRouter from './routes/postRoutes.js'


app.use('/api/posts' , postRouter)



const pool = new Pool

pool.connect((err , client , done) => {
    if(err){
        console.log(`error connecting to database` , err)
    } else {
        console.log(`connected to database`)
    }
    done()
})

app.listen(process.env.PORT , () => {
    console.log(`server started on port ${process.env.PORT}`)
})
