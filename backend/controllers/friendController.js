import * as db from '../db/index.js'

//get users friends 
const getFriends = async (req, res) => {
    const { id } = req.user
    try {

        const friendRequest = await db.query(` SELECT u.user_id, u.name, u.last_name, u.email
        FROM friends f
        JOIN users u ON (f.user_id = u.user_id OR f.friend_id = u.user_id)
        WHERE (f.user_id = $1 OR f.friend_id = $1) AND f.status = 'accepted'
          AND u.user_id != $1`, [id])

        res.status(200).json(friendRequest.rows)

    } catch (error) {
        console.log(`error getting friends`, error)
        res.status(500).json({ message: 'something went wrong getting friends ' })
    }
}


const sendFriendRequest = async (req, res) => {
    const { id } = req.user
    const { friend_id } = req.body

    try {

        const friendRequest = await db.query(`INSERT INTO friends (user_id , friend_id) VALUES ($1 , $2) RETURNING *`, [id, friend_id])

        res.status(200).json(friendRequest.rows)

    } catch (error) {
        console.log(`error sending friend requiest`, error)
        res.status(500).json({ message: 'something went wrong sending friend requiest' })
    }
}


const pendingRequests = async (req, res) => {
    const { id } = req.user

    try {

        const friendRequest = await db.query(`SELECT
        f.id,
        sender.user_id AS sender_id,
        sender.name AS sender_name,
        sender.last_name AS sender_last_name,
        receiver.user_id AS friend_id,
        receiver.name AS receiver_name,
        receiver.last_name AS receiver_last_name
    FROM
        friends f
    JOIN
        users sender ON f.user_id = sender.user_id
    JOIN
        users receiver ON f.friend_id = receiver.user_id
    WHERE
        (f.user_id = $1 OR f.friend_id = $1)
        AND f.status = $2;`, [id, 'pending'])

        res.status(200).json(friendRequest.rows)

    } catch (error) {
        console.log(`error getting pending requests`, error)
        res.status(500).json({ message: 'something went wrong getting pending requests' })
    }
}


const acceptRequest = async (req, res) => {
    const { friendRequestId } = req.body
    const {id} = req.user

    try {

        const checkExists = await db.query(`SELECT * FROM friends WHERE status =$1 AND id = $2 AND friend_id = $3` , ['pending', friendRequestId , id])

        if(checkExists.rows.length === 0){
            return res.status(404).json({message: 'No friend Requests'})
        }

        const friendRequest = await db.query(`UPDATE friends SET status = $1 WHERE id = $2 AND friend_id = $3;`, ['accepted', friendRequestId , id])

        res.status(200).json(friendRequest.rows)

    } catch (error) {
        console.log(`error sending friend requiest`, error)
        res.status(500).json({ message: 'something went wrong sending friend requiest' })
    }
}






export { sendFriendRequest, pendingRequests, acceptRequest, getFriends }