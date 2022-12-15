// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contact from 'App/Models/Contact'
import User from 'App/Models/User'

export default class ContactsController {
  public async all({ auth }) {
    return Contact.query().where('user_id', auth.user.id)
  }

  public async search({ auth, request }) {
    const { name: searchName } = request.qs()
    const user = await User.findOrFail(auth.user.id)
    const x = await user.related('contact').query().where('name', searchName)
    return x
  }
}
