import moment from 'moment'
import { Snack, SnackModel } from '../models/SnackModel'

export class SnackController {
  async save(snack: Snack) {
    const snackOfTheDay = await this.findSnackOfTheDay()
    console.log(snackOfTheDay)
    if (snackOfTheDay) {
      const updatedSnack = await SnackModel.findOneAndReplace(
        {
          _id: snackOfTheDay._id,
        },
        { title: snack.title, description: snack.description }
      )

      return updatedSnack
    }

    const savedSnack = await SnackModel.create(snack)
    return savedSnack
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
}
