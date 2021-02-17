class Application {
  constructor() {
    if (this.instance) {
      return this.instance
    }

    this.createInstance()
  }

  createInstance() {
    Application.instance = this
  }

  config({ routes = [], history = null }) {
    this.history = history
    this.routes = routes.map((item, index) => {
      item.index = index
      item.node = new item.page({ title: item.title })
      return item
    })

    return this
  }

  run() {
    if (!this.routes || !this.history) {
      throw 'Invoke app.config first!'
    }

    this.down = this.history.listen(({ location, action }) => {
      this.routes.forEach((item) => {
        if (location.pathname === item.pathname) {
          this.render(item)
        }
      })
    })

    this.history.push(this.history.location.pathname)
    return this
  }

  setCurrentRoute(route) {
    if (this.currentRoute) {
      document.body.removeChild(this.currentRoute.node)
    }
    this.currentRoute = route
  }

  render(item) {
    this.setCurrentRoute(item)
    document.title = item.title
    document.body.appendChild(item.node)
  }
}

module.exports.Application = Application
module.exports.app = new Application()