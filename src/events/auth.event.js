import EventEmitter from 'events'

class AuthEvent extends EventEmitter {
  constructor() {
    super()
    this.listenAuthEvents()
  }

  logUserAction(action, user) {
    console.log(`User ${action}:`, user)
  }

  emitUserAction(action, user) {
    this.emit(action, user)
  }

  listenAuthEvents() {
    this.on('userLoggedIn', (user) => this.logUserAction('login', user))
    this.on('userLoggedOut', (user) => this.logUserAction('logout', user))
  }
}

export default AuthEvent
