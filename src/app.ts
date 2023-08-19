import express from 'express'
import logger from 'morgan'
import session from 'express-session'
import fileUpload from 'express-fileupload'

import { connectToMongoDB } from './config/db'
import { join } from 'path'
import { viewsRouter } from './routes/views'
import { snacksRouter } from './routes/snacks'
import { apiRouter } from './routes/api'

connectToMongoDB()

export const app = express()
app.enable('trust proxy')
app.use(logger('dev'))
app.use(fileUpload())
app.engine('pug', require('pug').__express)
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use('/snacks', snacksRouter)
app.use('/api', apiRouter)
app.use('/', viewsRouter)
