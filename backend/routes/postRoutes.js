import express from 'express'
const router = express.Router()

import {getAllPosts , createPost} from '../controllers/postController.js'
import authenticate from '../middleware/authentication.js'


router.get('/' , getAllPosts)

router.use(authenticate)
router.post('/' , createPost)


export default router