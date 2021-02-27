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

module.exports.getNames = (name) => {
  const rawName = name
  const temp = []

  for (let i = 0; i < name.length; i++) {
    if (/[A-Z]/.test(name[i])) {
      temp.push(' ' + name[i].toLowerCase())
    } else if (/( )|\.|-|_|\*|\@|\#|\?|\^|\&|\%|\!|\(|\)|\[|\]|\{|\}/.test(name[i])) {
      temp.push(' ')
    } else {
      temp.push(name[i])
    }
  }

  let formatName = temp.join('').replace(/ /g, '_')
  let fileName = formatName.slice(1, formatName.length)

  className = formatName.split('_').map(item => {
    item = item.charAt(0).toUpperCase() + item.slice(1, item.length)
    return item
  }).join('')
  return {rawName, formatName, className, fileName, dirName: fileName}
}