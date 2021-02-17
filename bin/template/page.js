module.exports.pageTemplate = (name) => `import { Page } from 'walim'

export class ${name} extends Page {
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
        Hi I am ${name} Page that extended!!!
      </div>
    <walim>
  }
}
customElements.define('walim-${name.toLowerCase()}', ${name})`

