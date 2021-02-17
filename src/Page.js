exports.Page = class Page extends HTMLElement {
  constructor(props = {}) {
    super(props)
    this.mount()
    this.setTitle(props.title)
  }

  mount() {
    const rendered = this.render()

    if (typeof rendered === 'string') {
      this.innerHTML = rendered
    } else if (rendered instanceof HTMLElement) {
      this.appendChild(rendered)
    }
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

