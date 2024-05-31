import express from 'express'

const router = express.Router()

import { registerUser , loginUser , logoutUser ,findUser} from '../controllers/userController.js'

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)
router.get('/:id' , findUser)




export default router
