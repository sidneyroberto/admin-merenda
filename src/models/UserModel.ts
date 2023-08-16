import { Document, Schema, model } from 'mongoose'
import EmailValidator from 'email-validator'

export interface User extends Document {
  login: string
  name: string
  salt: string
  hash: string
}

const schema = new Schema<User>({
  login: { type: String, required: true },
  name: { type: String, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
})

export const UserModel = model('User', schema)

enum UserMessages {
  INVALID_EMAIL = 'E-mail inválido',
  INVALID_NAME = 'O nome precisa conter ao menos 3 caracteres',
  INVALID_PASSWORD = 'A senha precisa conter ao menos 8 caracteres, 1 caractere maiúsculo e 1 dígito',
}

export const validateUserInputs = (userObj: any): string[] => {
  const errorMessages: string[] = []
  const { login, name, password } = userObj

  if (!EmailValidator.validate(login)) {
    errorMessages.push(UserMessages.INVALID_EMAIL)
  }

  if (name.length < 3) {
    errorMessages.push(UserMessages.INVALID_NAME)
  }

  if (
    password &&
    password.length >= 8 &&
    /[A-Z]/g.test(password) &&
    /[0-9]/g.test(password)
  ) {
    errorMessages.push(UserMessages.INVALID_PASSWORD)
  }

  return errorMessages
}
