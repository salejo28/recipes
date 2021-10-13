import jwt from 'jsonwebtoken'
import config from '../config/config'

export function CreateToken(id, email) {
    return jwt.sign({
        user_id: id,
        email
    }, config.TOKEN.SECRET_KEY)
}