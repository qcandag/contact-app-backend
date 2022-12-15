import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
}).prefix('auth')

Route.group(() => {
  Route.get('all', 'ContactsController.all')
  Route.get('search', 'ContactsController.search')
  Route.post('add', 'ContactsController.add')
  Route.put('edit', 'ContactsController.edit')
})
  .prefix('contact')
  .middleware('auth')
