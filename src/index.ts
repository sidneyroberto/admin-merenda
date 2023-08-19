import dotenv from 'dotenv'

dotenv.config()

declare module 'express-session' {
  interface SessionData {
    user: User
    token: string
  }
}

import { app } from './app'
import { connection } from 'mongoose'
import { User } from './models/UserModel'

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () =>
  console.log(`App running on port ${PORT}`)
)

const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM']

events.forEach((e) => {
  process.on(e, () => {
    server.close()
    connection.close()
  })
})
