import * as db from '../db/index.js'



const getAllPosts = async(req, res) => {
    try {
        const posts = await db.query(`SELECT * FROM posts;`)
        
        if(posts.rows.length === 0){
            return res.status(404).json({message: 'No posts found'})
        }

        res.status(200).json(posts.rows)
        
    } catch (error) {
        console.log(`error getting all posts`, error)
        res.status(500).json({message:'something went wrong getting posts'})
    }
}


const createPost = async(req ,res) => {
    const {content} = req.body

    if(!content) {
        return res.status(400).json({message: 'Please fill out all fields'})
    }
    
    try {
        const post = await db.query(`INSERT INTO posts (content) VALUES ($1)` , [content])

        res.status(201).json(post.rows[0])
        
    } catch (error) {
        console.log(`error creating post`, error)
        res.status(500).json({message:'something went wrong creating post'})
    }
}


export {getAllPosts , createPost}