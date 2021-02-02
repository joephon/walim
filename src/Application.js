module.exports.Application = class Application {
  constructor({ routes = [], history = null }) {
    if (this.instance) {
      return this.instance
    }
    this.routes = routes
    this.history = history
    this.createInstance()
  }

  createInstance() {
    this.initRoutes()
    this.listen()
    Application.instance = this
  }

  initRoutes() {
    this.routes = this.routes.map((item, index) => {
      item.index = index
      item.node = new item.page({ title: item.title })
      return item
    })
  }

  listen() {
    this.unlisten = this.history.listen(({ location, action }) => {
      this.routes.forEach((item) => {
        if (location.pathname === item.pathname) {
          this.render(item)
        }
      })
    })
    this.history.push(this.history.location.pathname)
  }

  setCurrentRoute(route) {
    if (this.currentRoute) {
      document.body.removeChild(this.currentRoute.node)
    }
    this.currentRoute = route
  }

  render(item) {
    this.setCurrentRoute(item)
    document.body.appendChild(item.node)
  }
}