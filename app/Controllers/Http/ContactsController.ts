// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contact from 'App/Models/Contact'

export default class ContactsController {
  public async all({ auth }) {
    return Contact.query().where('user_id', auth.user.id)
  }
}
