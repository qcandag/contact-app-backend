// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class LoginController {
  public async login({ auth, request }) {
    const { email, password } = request.body()
    const token = await auth.attempt(email, password, {
      expiresIn: '7days',
    })
    const userName = token.user.name
    return {
      token: token.token,
      name: userName,
    }
  }

  public async register({ request, response }) {
    try {
      const payload = await request.validate(RegisterValidator)
      await User.create(payload)
      return payload
    } catch (error) {
      response.json({
        message: 'Registration is failed by error',
        error: `${error.message}`,
      })
    }
  }

  public async getMe({ auth, response }) {
    const defaultReturnObject = { authenticated: false, user: null }
    try {
      const user = await User.findOrFail(auth.user.id)
      if (!user) {
        response.status(400).json(defaultReturnObject)
        return
      }
      response.status(200).json({ authenticated: true, user: user })
    } catch (err) {
      console.log('POST auth/me, Something Went Wrong', err)
      response.status(400).json(defaultReturnObject)
    }
  }
}
