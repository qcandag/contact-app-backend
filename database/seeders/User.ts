import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'TEST 1',
      email: 'test@test.com',
      password: '1234',
    })
  }
}
