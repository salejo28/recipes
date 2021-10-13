import { validationResult } from 'express-validator'
import { Login, Register } from "../middlewares/Users"

export class UsersControllers {
    async Login(req, res) {
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() })
        }
        const { success, errors, token } = await Login(req.body)
        if (!success) return res.status(401).json({
            success,
            errors
        })
        return res.status(200).set('x-access-token', `Bearer ${token}`).json({
            success,
            token
        })
    }

    async Register(req, res) {
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            return res.status(400).json({ errors: validationErrors.array() })
        }
        const { success, errors, token } = await Register(req.body)
        if (!success) return res.status(400).json({
            errors,
            success
        })
        return res.status(200).set('x-access-token', `Bearer ${token}`).json({
            success,
            token
        })
    }
}