module.exports.pageTemplate = (name) => `
import { Page } from 'walim'

export class ${name} extends Page {
  constructor(props = {}) {
    super(props)
  }

  render() {
    return <walim>
      <div>
        Hi I am ${name} Page that extended!!!
      </div>
    <walim>
  }
}
customElements.define('walim-${name.toLowerCase()}', ${name})
`

