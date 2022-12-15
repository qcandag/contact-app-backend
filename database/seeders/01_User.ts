import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'TEST 1',
        email: 'test@test.com',
        password: '1234',
      },
      {
        name: 'TEST 2',
        email: 'test2@test.com',
        password: '12345',
      },
    ])
  }
}
