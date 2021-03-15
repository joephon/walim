exports.Component = class Component extends HTMLElement {
  constructor(props = {}) {
    super(props)
    this._state = {}
    this.mount()
    this.setTitle(props.title)
  }

  get state() {
    return this._state
  }

  set state(obj) {
    this._state = { ...this._state, ...obj }
  }

  setState(obj) {
    this._state = { ...this._state, ...obj }
    this.mount()
  }

  mount() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }

    const rendered = this.render()

    if (typeof rendered === 'string') {
      this.shadowRoot.innerHTML = rendered
    } else if (rendered instanceof HTMLElement) {
      this.shadowRoot.appendChild(rendered)
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

