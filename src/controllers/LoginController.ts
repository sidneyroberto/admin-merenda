import { Request, Response, NextFunction } from 'express'

import { User, UserModel } from '../models/UserModel'
import {
  createUserObject,
  generateJWT,
  isPasswordValid,
  isTokenValid,
} from '../utils/security'

enum LoginMessages {
  USER_REGISTERED = 'Usuário registrado com sucesso',
  USER_ALREADY_EXISTS = 'Usuário já existente',
  USER_NOT_AUTHORIZED = 'Usuário não autorizado',
}

export default class LoginController {
  async registerUsuario(login: string, name: string, password: string) {
    let user = this.findUser(login)

    if (!user) {
      const newUser = createUserObject(login, name, password)
      await UserModel.create(newUser)

      return { registered: true, message: LoginMessages.USER_REGISTERED }
    } else {
      return { registered: false, mensagem: LoginMessages.USER_ALREADY_EXISTS }
    }
  }

  async doLogin(login: string, senha: string) {
    const user = await this.findUser(login)

    if (user && isPasswordValid(user, senha)) {
      const token = generateJWT(user)
      return {
        loggedIn: true,
        user,
        token,
      }
    } else {
      return {
        loggedIn: false,
        message: LoginMessages.USER_NOT_AUTHORIZED,
      }
    }
  }

  async findUser(login: string) {
    const user = await UserModel.findOne<User>({ login })
    return user
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.session.token
    console.log(token)

    if (isTokenValid(token)) {
      console.log('Vai para a home')
      next()
    } else {
      console.log('Vai para o login')
      res.redirect('/login')
    }
  }

  verifyUserLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token = req.session.token
    console.log(token)

    if (isTokenValid(token)) {
      console.log('Vai para a home')
      res.redirect('/snacks')
    } else {
      console.log('Vai para o login')
      next()
    }
  }
}
