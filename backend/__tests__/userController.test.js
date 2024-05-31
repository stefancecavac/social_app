import { registerUser, loginUser } from '../controllers/userController.js'
import * as db from '../db/index.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'


jest.mock('../db/index.js')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')


describe('register user', () => {
    let req
    let res

    beforeEach(() => {
        req = { body: {} }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        }
    })


    it('should return 400 if fields are left empty', async () => {

        await registerUser(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: 'Please fill out all fields' })
    })

    it('should return 400 if its not valid email', async () => {
        req.body = { name: 'lol', last_name: 'loler', email: 'not email', password: 'pasword123' }
        jest.spyOn(validator, 'isEmail').mockReturnValue(false);
        jest.spyOn(validator, 'isStrongPassword').mockReturnValue(true);

        await registerUser(req, res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: 'Not a valid email' })
    })

    it(' should return 400 if password isnt strong enough', async () => {
        req.body = { name: 'lol', last_name: 'loler', email: 'valid.lol@email.com', password: 'weakpassword' }
        jest.spyOn(validator, 'isEmail').mockReturnValue(true);
        jest.spyOn(validator, 'isStrongPassword').mockReturnValue(false);

        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not a strong password' });
    })

    it('should return 400 if email exists' , async() => {
        req.body = { name: 'lol', last_name: 'loler', email: 'valid.lol@email.com', password: 'weakpassword' }
        jest.spyOn(validator, 'isEmail').mockReturnValue(true);
        jest.spyOn(validator, 'isStrongPassword').mockReturnValue(true)

        db.query.mockResolvedValue({rows: [{id: 1}]})

        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already in use' });
    })

    it('should return 200 if user succesfully registered' , async() => {
        req.body = { name: 'lol', last_name: 'loler', email: 'valid.lol@email.com', password: 'weakpassword' }
        jest.spyOn(validator, 'isEmail').mockReturnValue(true);
        jest.spyOn(validator, 'isStrongPassword').mockReturnValue(true)

        db.query.mockResolvedValueOnce({ rows: [] });

        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');
        const mock = { id: 1, name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'hashedPassword' };

        db.query.mockResolvedValueOnce({ rows: [mock] });
        jwt.sign.mockReturnValue('token');


        await registerUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mock);
        expect(res.cookie).toHaveBeenCalledWith('token', 'token', { httpOnly: true, secure: true });
    })

})