exports.Component = class Component extends HTMLElement {
  constructor(props = {}) {
    super(props)
    this.mount()
  }

  mount() {
    const rendered = this.render()

    if (typeof rendered === 'string') {
      this.innerHTML = rendered
    } else if (rendered instanceof HTMLElement) {
      this.appendChild(rendered)
    }
  }

  render() {
    return `
      <div>
        Hi I am Component!!!
      </div>
    `
  }

}

