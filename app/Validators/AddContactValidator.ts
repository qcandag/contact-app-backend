import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddContactValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}),
    phone_number: schema.string({}, [rules.minLength(12), rules.maxLength(12)]),
  })

  public messages: CustomMessages = {}
}
