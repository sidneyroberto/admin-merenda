import { Router } from 'express'
import LoginController from '../controllers/LoginController'

export const viewsRouter = Router()
const loginCtrl = new LoginController()

viewsRouter.get('/', (req, res) => res.redirect('/snacks'))

viewsRouter.get('/login', loginCtrl.verifyUserLoggedIn, (req, res) =>
  res.render('login')
)

viewsRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  const response = await loginCtrl.doLogin(email, password)

  if (response.loggedIn) {
    req.session.token = response.token
    req.session.user = response.user
    return res.redirect('/snacks')
  }

  res.render('login', { message: response.message })
})

viewsRouter.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'))
})
