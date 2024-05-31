import * as db from '../db/index.js'



const getAllPosts = async (req, res) => {
    try {
        const posts = await db.query(`SELECT 
        posts.post_id, 
        posts.content, 
        posts.created_at, 
        users.name, 
        users.last_name,
        users.user_id
    FROM posts 
    INNER JOIN users 
    ON posts.user_id = users.user_id;`)

        if (posts.rows.length === 0) {
            return res.status(404).json({ message: 'No posts found' })
        }

        res.status(200).json(posts.rows)

    } catch (error) {
        console.log(`error getting all posts`, error)
        res.status(500).json({ message: 'something went wrong getting posts' })
    }
}


const createPost = async (req, res) => {
    const { content } = req.body
    const { id } = req.user

    if (!content) {
        return res.status(400).json({ message: 'Please fill out all fields' })
    }

    try {
        const post = await db.query(`INSERT INTO posts (content , user_id) VALUES ($1 , $2)`, [content, id])

        res.status(201).json(post.rows[0])

    } catch (error) {
        console.log(`error creating post`, error)
        res.status(500).json({ message: 'something went wrong creating post' })
    }
}


export { getAllPosts, createPost }