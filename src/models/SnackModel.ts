import { Schema, model } from 'mongoose'

export interface Snack {
  title: string
  offerDate: Date
  evaluationScore: number
  description: string
  thumbURL: string
}

const schema = new Schema<Snack>({
  title: { type: String, required: true },
  offerDate: { type: Date, default: new Date() },
  evaluationScore: { type: Number, default: 0 },
  description: { type: String, required: true },
  thumbURL: { type: String },
})

export const SnackModel = model('Snack', schema)

enum SnackMessages {
  INVALID_TITLE = 'O título deve conter ao menos 5 caracteres',
  INVALID_DESCRIPTION = 'A descrição deve conter ao menos 5 caracteres',
}

export const validateSnackInputs = (snackObj: any) => {
  const { title, description } = snackObj
  const errorMessages: string[] = []

  if (title.length < 5) {
    errorMessages.push(SnackMessages.INVALID_TITLE)
  }

  if (description.length < 5) {
    errorMessages.push(SnackMessages.INVALID_DESCRIPTION)
  }

  return errorMessages
}
