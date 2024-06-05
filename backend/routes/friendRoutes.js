import express from 'express'

const router = express.Router()


import {sendFriendRequest , pendingRequests , acceptRequest , getFriends}   from '../controllers/friendController.js'
import authenticate from '../middleware/authentication.js'


router.use(authenticate)
router.get('/pending' , pendingRequests)
router.post('/send-request' , sendFriendRequest)
router.post('/accept-request' , acceptRequest)
router.get('/all-friends' , getFriends)




export default router