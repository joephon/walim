module.exports.componentTemplate = (name) => `
import { Component } from 'walim'

export class ${name} extends Component {
  constructor(props = {}) {
    super(props)
  }

  render() {
    return <walim>
      <div>
        Hi I am ${name} compoent that extended!!!
      </div>
    <walim>
  }
}

customElements.define('walim-${name.toLowerCase()}', ${name})
`