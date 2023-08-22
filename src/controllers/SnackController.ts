import moment from 'moment'
import { Snack, SnackModel } from '../models/SnackModel'

export class SnackController {
  async save(snack: Snack) {
    const snackOfTheDay = await this.findSnackOfTheDay()
    if (snackOfTheDay) {
      const updatedSnack = await SnackModel.findOneAndReplace(
        {
          _id: snackOfTheDay._id,
        },
        {
          title: snack.title,
          description: snack.description,
          thumbURL: snack.thumbURL,
        }
      )

      return updatedSnack
    }

    const savedSnack = await SnackModel.create(snack)
    return savedSnack
  }

  async updateScore(id: string, score: number) {
    const snack = await this.findById(id)
    const divisor = snack.evaluationScore === 0 ? 1 : 2
    snack.evaluationScore = (snack.evaluationScore + score) / divisor
    const updatedSnack = await SnackModel.updateOne({ _id: id }, snack)
    return updatedSnack
  }

  async findSnackOfTheDay() {
    const currentDate = `${moment().format('YYYY-MM-DD')}T00:00:00.000Z`
    console.log(`currentDate: ${currentDate}`)
    const snackOfTheDay = await SnackModel.findOne({
      offerDate: {
        $gte: new Date(currentDate),
      },
    })
    return snackOfTheDay
  }

  async findLastSnacks(page: number, amount: number) {
    const snacks = await SnackModel.find()
      .sort({ offerDate: -1 })
      .skip((page - 1) * amount)
      .limit(amount)
      .exec()

    return snacks
  }

  async findSnacksAmount() {
    const amount = await SnackModel.count({})
    return amount
  }

  async findById(id: string) {
    const snack = await SnackModel.findById(id)
    return snack
  }
}
