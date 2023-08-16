import dotenv from 'dotenv'

import { connectToMongoDB } from './config/db'
import { UserModel } from './models/UserModel'
import { createUserObject } from './utils/security'

dotenv.config()

connectToMongoDB().then(async () => {
  const user = createUserObject(
    'sidney.sousa@ifms.edu.br',
    'Sidney Sousa',
    'admin123aiquefome'
  )

  const savedObj = await UserModel.create(user)
  console.log(savedObj)
})
