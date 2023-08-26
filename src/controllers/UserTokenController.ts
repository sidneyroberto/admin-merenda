import { UserToken, UserTokenModel } from '../models/UserToken'

export class UserTokenController {
  async save(userToken: UserToken) {
    let token = await this.findByDeviceToken(userToken.deviceToken)

    if (!token) {
      token = await UserTokenModel.create(userToken)
    }

    console.log('Already exists')
    return token
  }

  async findAll() {
    const tokens = await UserTokenModel.find()
    return tokens
  }

  async findByDeviceToken(deviceToken: string) {
    const token = await UserTokenModel.findOne({ deviceToken })
    return token
  }
}
