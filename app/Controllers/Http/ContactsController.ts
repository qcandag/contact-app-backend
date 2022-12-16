/* eslint-disable @typescript-eslint/naming-convention */
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Contact from 'App/Models/Contact'
import User from 'App/Models/User'
import AddContactValidator from 'App/Validators/AddContactValidator'

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
    await request.validate(AddContactValidator)
    const user = await User.findOrFail(auth.user.id)
    const { name, phone_number } = request.body()

    const contact = await user.related('contact').create({
      name: name,
      phone_number: phone_number,
    })
    return contact
  }

  public async edit({ auth, request }) {
    const { name, phone_number, contact_id } = request.body()

    const user = await User.findOrFail(auth.user.id)
    const contact = await Contact.findOrFail(contact_id)

    const updatedContact = await user
      .related('contact')
      .query()
      .where('id', contact_id)
      .update({ name: name || user.name, phone_number: phone_number || contact.phone_number }, [
        'name',
        'phone_number',
      ])
    return updatedContact
  }
}
