module.exports.routesTemplate = (modules) => `
import { ${modules.split(',').join(', ')} } from './pages'
const routes = [
  ${renderLine(modules)}
]

export default routes
`

function renderLine(modules) {
  const data = modules.split(',').map(item => {
    return `{ pathname: '/${item.toLowerCase()}', page: ${item}, title: '${item}' }`
  })

  const [first] = modules.split(',')
  data.unshift(`{ pathname: '/', page: ${first}, title: '${first}' }`)

  return data.join(',\n  ')
}