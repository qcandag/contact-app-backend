import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
}).prefix('auth')

Route.group(() => {
  Route.get('all', 'ContactsController.all')
  Route.get('search/:id?', 'ContactsController.search')
})
  .prefix('contact')
  .middleware('auth')
