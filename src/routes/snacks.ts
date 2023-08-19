import { Router } from 'express'
import { UploadedFile } from 'express-fileupload'
import moment from 'moment'

import { SnackController } from '../controllers/SnackController'
import { Snack, SnackModel, validateSnackInputs } from '../models/SnackModel'
import LoginController from '../controllers/LoginController'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../config/firebase'

export const snacksRouter = Router()
const snackCtrl = new SnackController()
const loginCtrl = new LoginController()

const PER_PAGE = 9

snacksRouter.post('/thumb/upload', loginCtrl.verifyToken, async (req, res) => {
  const thumb = req.files['thumb'] as UploadedFile
  const refName = moment().format('YYYY_MM_DD')
  const storageRef = ref(storage, refName)
  const fileContent = thumb.data
  const metadata = {
    contentType: thumb.mimetype,
  }
  const result = await uploadBytes(storageRef, fileContent, metadata)
  console.log(`File upload result: ${result}`)
})

snacksRouter.post('/new_snack', loginCtrl.verifyToken, async (req, res) => {
  const errorMessages = validateSnackInputs(req.body)

  if (errorMessages.length === 0) {
    const { title, description } = req.body
    const snack = new SnackModel({ title, description })
    try {
      const refName = moment(snack.offerDate).format('YYYY_MM_DD')
      console.log(`Trying to retrieve thumb from ${refName}`)
      const snackURL = await getDownloadURL(ref(storage, refName))
      snack.thumbURL = snackURL
    } catch (err) {}
    await snackCtrl.save(snack)
    return res.render('new_snack', {
      successMessage: 'Merenda do dia salva!',
    })
  }

  return res.render('new_snack', { errorMessages, token: req.session.token })
})

snacksRouter.get('/new_snack', loginCtrl.verifyToken, (req, res) =>
  res.render('new_snack')
)

snacksRouter.get('/details/:id', loginCtrl.verifyToken, async (req, res) => {
  const snack = await snackCtrl.findById(req.params.id)
  const page = Number(req.query.page)
  res.render('snack_details', { snack, page: !isNaN(page) ? page : 1 })
})

snacksRouter.get('/:page', loginCtrl.verifyToken, async (req, res) => {
  const page = Number(req.params.page)
  const amount = await snackCtrl.findSnacksAmount()
  const snacks = await snackCtrl.findLastSnacks(page, PER_PAGE)
  res.render('snacks', {
    snacks,
    totalPages: Math.ceil(amount / PER_PAGE),
    page,
    perPage: PER_PAGE,
  })
})

snacksRouter.post('/evaluate/:id/:score', async (req, res) => {
  const score = Number(req.params.score)
  if (!isNaN(score) && score >= 1 && score <= 5) {
    const id = req.params.id
    await snackCtrl.updateScore(id, score)
    return res.status(200).json({ message: 'Avaliação salva' })
  }

  return res.status(400).json({ message: 'Nota inválida' })
})

snacksRouter.get('/today', async (req, res) => {
  const snack = await snackCtrl.findSnackOfTheDay()
  return res.status(200).json({ snack })
})
