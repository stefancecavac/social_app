import express from 'express'
const router = express.Router()

import {getAllPosts , createPost} from '../controllers/postController.js'


router.get('/' , getAllPosts)
router.post('/' , createPost)


export default router