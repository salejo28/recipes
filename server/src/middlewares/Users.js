import fs from 'fs'
import path from 'path'
import { v4 } from 'uuid'
import config from '../config/config'
import { ComparePassword, Hash } from '../security/password'
import { CreateToken } from './Token'

export async function Register(data) {
    const json_users = await fs.readFileSync(config.DB.USERS, 'utf-8')
    let users = JSON.parse(json_users)
    const existEmail = users.find(user => user.email === data.email)
    if (existEmail !== undefined) {
        return {
            success: false,
            errors: [
                {
                    param: 'email',
                    msg: "Email is already exists!"
                }
            ]
        }
    }
    const id = v4()
    data.password = await Hash(data.password)
    const newUser = {
        id,
        ...data
    }
    users.push(newUser)
    await fs.writeFileSync(config.DB.USERS, JSON.stringify(users), 'utf-8')
    const token = CreateToken(id, data.email)
    return {
        success: true,
        token
    }
}

export async function Login(data) {
    const json_users = await fs.readFileSync(config.DB.USERS, 'utf-8')
    let users = JSON.parse(json_users)
    const user = users.find(user => user.email === data.email)
    // Check if exist
    if (user === undefined) {
        return {
            success: false,
            errors: [
                {
                    param: 'email',
                    msg: "Email does not exist!"
                }
            ]
        }
    }
    // Check password
    const matchPassword = await ComparePassword(data.password, user.password)
    if (!matchPassword) return {
        success: false,
        errors: [
            {
                param: 'password',
                msg: 'Invalid password!'
            }
        ]
    }
    const token = CreateToken(user.id, user.email)
    return {
        success: true,
        token
    }
}