import jwt from 'jsonwebtoken'


const authenticate = async (req, res, next) => {
    const token = req.cookies.token

    try {
        if (!token) {
            return res.status(400).json({ message: 'No auth token provided' })
        }

        const decodedToken = jwt.decode(token, process.env.SECRET)
        if (!decodedToken) {
            return res.status(400).json({ message: 'Not a valid token' })
        }
        req.user = decodedToken
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'something went wrong decoding token'})
    }
}

export default authenticate