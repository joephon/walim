module.exports.help = () => {
  console.log('supported commands as below:')
  console.log('help - show help info')
  console.log('version - show version info')
  console.log('init your/project/root/dir/path - initial project')
}

module.exports.version = () => {
  console.log(`version: ${require('../../package.json').version}`)
}