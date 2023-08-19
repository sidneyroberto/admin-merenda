import { Router } from 'express'
import { SnackController } from '../controllers/SnackController'

export const apiRouter = Router()
const snackCtrl = new SnackController()

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
