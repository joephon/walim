exports.Page = class Page extends HTMLElement {
  constructor(props = {}) {
    super(props)
    this.mount()
    this.setTitle(props.title)
  }

  mount() {
    this.innerHTML = this.render()
  }

  setTitle(title) {
    document.title = title || 'Walim App'
  }

  render() {
    return `
      <div>
        Hi I am Page!!!
      </div>
    `
  }

}

