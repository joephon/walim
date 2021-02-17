module.exports.componentTemplate = (name) => `import { Component } from 'walim'

export class ${name} extends Component {
  constructor(props = {}) {
    super(props)
  }

  static get observedAttributes() {
    return []
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue)
  }

  connectedCallback() {
    console.log('connected')
  }

  disconnectedCallback() {
    console.log('disconnected')
  }

  adoptedCallback() {
    console.log('adopted');
  }

  render() {
    return <walim>
      <div>
        Hi I am ${name} compoent that extended!!!
      </div>
    <walim>
  }
}

customElements.define('walim-${name.toLowerCase()}', ${name})`