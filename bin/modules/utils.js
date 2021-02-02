const path = require('path')
const fs = require('fs')

async function mkdir(dir) {
  await fs.promises.mkdir(dir)
}


module.exports.getClassName = (name) => {
  name = name.split('-')
  name = name.map(item => {
    item = item.charAt(0).toUpperCase() + item.slice(1, item.length)
    return item
  }).join()
  return name
}