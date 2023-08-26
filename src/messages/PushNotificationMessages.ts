import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

import serviceAccount from '../keys/serviceAccountKey.json'
import { UserTokenController } from '../controllers/UserTokenController'
import { UserToken } from '../models/UserToken'

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
})

export const sendPushNotificationToAll = async (
  title: string,
  body: string
) => {
  try {
    const userCtrl = new UserTokenController()
    const tokens = await userCtrl.findAll()

    const messages = tokens.map((t: UserToken) => ({
      token: t.deviceToken,
      notification: { title, body },
    }))

    const batchPromises = []

    const messaging = getMessaging(app)

    for (let i = 0; i < messages.length; i++) {
      const batchPromise = messaging.send(messages[i])
      batchPromises.push(batchPromise)
    }

    await Promise.all(batchPromises)

    console.log('Push notifications sent to all users')
  } catch (err) {
    console.error('Error sending push notifications:', err)
  }
}
