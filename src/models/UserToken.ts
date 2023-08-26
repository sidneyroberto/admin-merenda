import { Document, Schema, model } from 'mongoose'

export interface UserToken extends Document {
  deviceToken: string
}

const schema = new Schema<UserToken>({
  deviceToken: { type: String, required: true, unique: true },
})

export const UserTokenModel = model('UserToken', schema)
