exports.Component = class Component extends HTMLElement {
  constructor(props = {}) {
    super(props)
    this.mount()
  }

  mount() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const rendered = this.render()

    if (typeof rendered === 'string') {
      shadowRoot.innerHTML = rendered
    } else if (rendered instanceof HTMLElement) {
      shadowRoot.appendChild(rendered)
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

