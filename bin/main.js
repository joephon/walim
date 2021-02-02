#!/usr/bin/env node
const modules = require('./modules')

function main(argv) {
  parse(argv)
}

function parse(argv) {
  if (!argv.length) {
    return modules.help()
  }

  const [command, ...options] = argv
  if (!modules[command]) {
    return modules.help()
  }
  modules[command](options)
}

main(process.argv.slice(2))