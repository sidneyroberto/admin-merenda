import { Router } from 'express'
import { UploadedFile } from 'express-fileupload'
import moment from 'moment'

import { SnackController } from '../controllers/SnackController'
import { SnackModel, validateSnackInputs } from '../models/SnackModel'
import LoginController from '../controllers/LoginController'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../config/firebase'

export const snacksRouter = Router()
const snackCtrl = new SnackController()
const loginCtrl = new LoginController()

const PAGE = 1
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

snacksRouter.get('/', loginCtrl.verifyToken, async (req, res) => {
  const snacks = await snackCtrl.findLastSnacks(PAGE, PER_PAGE)
  res.render('snacks', { snacks })
})
