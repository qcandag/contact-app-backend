import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Contact from 'App/Models/Contact'

export default class extends BaseSeeder {
  public async run() {
    await Contact.createMany([
      {
        user_id: 1,
        name: 'KremBi',
        phone_number: 902129092306,
      },
      {
        user_id: 1,
        name: 'Can',
        phone_number: 905413035615,
      },
    ])
  }
}
