import { Router } from 'express'
import { SnackController } from '../controllers/SnackController'
import { UserTokenController } from '../controllers/UserTokenController'
import { UserTokenModel } from '../models/UserToken'

export const apiRouter = Router()
const snackCtrl = new SnackController()
const userTokenCtrl = new UserTokenController()

apiRouter.post('/evaluate/:id/:score', async (req, res) => {
  const score = Number(req.params.score)
  if (!isNaN(score) && score >= 1 && score <= 5) {
    const id = req.params.id
    await snackCtrl.updateScore(id, score)
    return res.status(200).json({ message: 'Avaliação salva' })
  }

  return res.status(400).json({ message: 'Nota inválida' })
})

apiRouter.get('/today', async (req, res) => {
  const snack = await snackCtrl.findSnackOfTheDay()
  if (snack) {
    return res.status(200).json({ snack })
  }

  return res
    .status(404)
    .json({ message: 'Merenda do dia ainda não disponível' })
})

apiRouter.post('/token', async (req, res) => {
  const { deviceToken } = req.body
  console.log(req.body)

  if (deviceToken) {
    const token = new UserTokenModel({ deviceToken })
    const savedToken = await userTokenCtrl.save(token)
    return res.status(201).json({ token: savedToken })
  }

  return res.status(400).json({ message: 'deviceToken inválido' })
})
