exports.Component = class Component extends HTMLElement {
  constructor(props = {}) {
    super(props)
    this.mount()
  }

  mount() {
    this.innerHTML = this.render()
  }

  render() {
    return `
      <div>
        Hi I am Component!!!
      </div>
    `
  }

}

