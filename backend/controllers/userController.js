import * as db from '../db/index.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const registerUser = async (req, res) => {
    const { name, last_name, email, password } = req.body

    if (!name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields' })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Not a valid email' })
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        return res.status(400).json({ message: 'Not a strong password' })
    }

    try {
        const emailExists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])

        if (emailExists.rows[0]) {
            return res.status(400).json({ message: 'Email already in use' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await db.query(`INSERT INTO users( name, last_name, email, password) VALUES ($1 , $2 , $3 , $4);`
            , [name, last_name, email, hashedPassword])

        const token = jwt.sign({ id: user.user_id }, process.env.SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        })

        res.status(200).json({
            id: user.user_id,
            email: user.email,
            name: user.name,
            last_name: user.last_name
        })

    } catch (error) {
        console.log(`error registering user`, error)
        res.status(500).json({ message: 'something went wrong registering user' })
    }
}



const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill out all fields' })
    }

    try {
        let emailExists = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])

        if (!emailExists.rows[0]) {
            return res.status(400).json({ message: 'Wrong email' })
        }
        const user = emailExists.rows[0]
        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            return res.status(400).json({ message: 'Wrong password' })
        }

        const token = jwt.sign({ id: user.user_id }, process.env.SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true
        })

        res.status(200).json({
            id: user.user_id,
            email: user.email,
            name: user.name,
            last_name: user.last_name
        })

    } catch (error) {
        console.log(`error loging user`, error)
        res.status(500).json({ message: 'something went wrong loging user' })
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token')
    res.end()
}



const findUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id])
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'No user found with that id' })
        }

        res.status(200).json(user.rows[0])
    } catch (error) {
        console.log(`error finding user`, error)
        res.status(500).json({ message: 'something went wrong finding user' })
    }
}


export { registerUser, loginUser, logoutUser, findUser }