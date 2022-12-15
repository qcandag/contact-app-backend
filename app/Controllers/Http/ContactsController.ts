/* eslint-disable @typescript-eslint/naming-convention */
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
    const contact = await user.related('contact').query().where('name', searchName).firstOrFail()
    return contact
  }
  // create find function to find user by id 'DRY'
  public async add({ auth, request }) {
    const user = await User.findOrFail(auth.user.id)
    const { name, phone_number } = request.body()

    const contact = await user.related('contact').create({
      name: name,
      phone_number: phone_number,
    })
    // add validation
    return contact
  }

  public async edit({ auth, request }) {
    const user = await User.findOrFail(auth.user.id)
    const { name, phone_number, contact_id } = request.body()
    const updatedContact = await user
      .related('contact')
      .query()
      .where('id', contact_id)
      .update({ name: name, phone_number: phone_number })
    // add validation
    return updatedContact
  }
}
