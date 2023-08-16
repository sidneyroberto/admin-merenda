import dotenv from 'dotenv'

import { connectToMongoDB } from './config/db'
import { Snack, SnackModel } from './models/SnackModel'

dotenv.config()

const snacks: Partial<Snack>[] = [
  {
    title: 'Pão com carne',
    description: 'Pão recheado com carne moída',
  },
  {
    title: 'Arroz carreteiro',
    description: 'Arroz com charque e um delicioso tempero pantaneiro',
  },
  {
    title: 'Frango com polenta',
    description:
      'Frango ensopado acompanhado com uma deliciosa polenta cremosa',
  },
  {
    title: 'Macarrão com carne moída',
    description: 'Espaguete com um delicioso molho à bolonhesa',
  },
  {
    title: 'Canjica',
    description:
      'Canjica com um caldo doce maravilhoso com aquele toque de canela',
  },
  {
    title: 'Galinhada',
    description: 'Arroz com frango, milho, ervilhas e um tempero fabuloso',
  },
  {
    title: 'Pão e iogurte',
    description: 'Pão com margarina e iogurte de morango',
  },
  {
    title: 'Nhoque',
    description: 'Nhoque de batatas ao molho bolonhesa',
  },
  {
    title: 'PF #1',
    description: 'Arroz, feijão, salada e bife',
  },
  {
    title: 'PF #2',
    description: 'Arroz, feijão, salada e frango grelhado',
  },
  {
    title: 'PF #3',
    description: 'Arroz, feijão, salada e linguiça',
  },
  {
    title: 'PF #4',
    description: 'Macarrão alho e óleo e frango grelhado',
  },
  {
    title: 'PF #5',
    description: 'Macarrão ao molho bolonhesa e almôndegas',
  },
]

connectToMongoDB().then(async () => {
  await SnackModel.deleteMany({})
  for (let i = 0; i < snacks.length; i++) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const snack = new SnackModel({
      title: snacks[i].title,
      description: snacks[i].description,
      offerDate: d,
    })
    await SnackModel.create(snack)
  }

  console.log('Mal feito desfeito')
})
