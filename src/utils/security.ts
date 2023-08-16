import crypto from 'crypto'
import { decode, verify, sign, JwtPayload } from 'jsonwebtoken'
import { User, UserModel } from '../models/UserModel'

export const isPasswordValid = (user: User, password: string) => {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  return hash === user.hash
}

export const createUserObject = (
  email: string,
  name: string,
  password: string
): User => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = new UserModel({ login: email, name, salt, hash })
  return user
}

export const generateJWT = (user: User) =>
  sign(
    {
      user: user.login,
      timestamp: new Date(),
    },
    process.env.SECRET,
    {
      expiresIn: '1h',
    }
  )

export const isTokenValid = (token: string): boolean => {
  if (token) {
    try {
      verify(token, process.env.SECRET)
      return true
    } catch (error) {
      return false
    }
  }

  return false
}

export const decodeUserEmailFromToken = (token: string) => {
  const tokenCode = token.substring(7, token.length)
  const tokenPayload = decode(tokenCode, { complete: true })
  const payload: JwtPayload = tokenPayload.payload as JwtPayload
  return payload['user']
}
