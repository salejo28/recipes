import { Router } from 'express'
import { body, check } from 'express-validator'
import { UsersControllers } from '../controllers/users.controllers'
import { ensureJson } from '../middlewares/EnsureJson'

class UsersRoutes {
    constructor() {
        this.router = Router()
        this.controller = new UsersControllers()

        this.Login()
        this.Register()
    }

    Login() {
        this.router.post('/login', [
            ensureJson,
            body('email', 'Email is required!')
                .exists()
                .notEmpty(),
            body('password', 'Password is required!')
                .exists()
                .notEmpty(),
            check('email')
                .isEmail()
                .withMessage('Invalid email!')
        ], this.controller.Login)
    }

    Register() {
        this.router.post('/register', [
            ensureJson,
            body('first_name', 'First name is required!')
                .exists()
                .notEmpty(),
            body('last_name', 'Last name is required!')
                .exists()
                .notEmpty(),
            body('email', 'Email is required!')
                .exists()
                .notEmpty(),
            body('password', 'Password is required!')
                .exists()
                .notEmpty(),
            check('email')
                .isEmail()
                .withMessage('Invalid email!'),
            check('password')
                .isLength({ min: 6 })
                .withMessage('Must be at least 6 chars long')
        ], this.controller.Register)
    }
}

export default new UsersRoutes().router