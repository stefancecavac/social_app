import express from 'express'
const router = express.Router()

import {getAllPosts , createPost} from '../controllers/postController.js'
import authenticate from '../middleware/authentication.js'


router.use(authenticate)
router.get('/' , getAllPosts)
router.post('/' , createPost)


export default router