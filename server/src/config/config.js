import { config } from 'dotenv'
config()

export default {
    PORT: process.env.PORT,
    DB: {
        USERS: process.env.USERS_DB,
        RECIPIES: process.env.RECIPIES_DB
    },
    TOKEN: {
        SECRET_KEY: process.env.SECRET_KEY
    }
}