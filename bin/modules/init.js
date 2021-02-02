const path = require('path')
const os = require('os')
const fs = require('fs')
const { execSync } = require('child_process')
const { help } = require('./common')
const { getClassName } = require('./utils')
const { pages, components } = require('../config/project.json')
const { pageTemplate } = require('../template/page')
const { componentTemplate } = require('../template/component')
const { webpackCommon } = require('../template/webpack.common')
const { webpackConfig } = require('../template/webpack.config')
const { webpackProd } = require('../template/webpack.prod')
const { webpackDev } = require('../template/webpack.dev')
const { gitignore } = require('../template/gitignore')
const { routesTemplate } = require('../template/routes')
const $ = require('shelljs')

module.exports.init = async (options = []) => {
  let [rootDir] = options
  if (!rootDir) {
    console.log('missing project dirname')
    return help()
  }

  setUp(rootDir)
}

function setUp(rootDir) {
  $.mkdir('-p', `${rootDir}/src`)
  initPages(rootDir)
  initComponents(rootDir)
  initConfig(rootDir)
  initModuleExport(rootDir)
  initRoutes(rootDir)
  initApplication(rootDir)
}


function initPages(rootDir) {
  pages.forEach(page => {
    page = page.split('/')
    const dirs = page.slice(0, -1).join('/')
    const name = getClassName(page.slice(1, 2).join())
    const file = page.slice(page.length - 1, page.length) + '.js'
    $.mkdir('-p', `${rootDir}/src/${dirs}`)
    fs.writeFileSync(`${rootDir}/src/${dirs}/${file}`, pageTemplate(name).replace(/<walim>/g, '`'))
  })
}

function initComponents(rootDir) {
  components.forEach(component => {
    component = component.split('/')
    const dirs = component.slice(0, -1).join('/')
    const name = getClassName(component.slice(1, 2).join())
    const file = component.slice(component.length - 1, component.length) + '.js'
    $.mkdir('-p', `${rootDir}/src/${dirs}`)
    fs.writeFileSync(`${rootDir}/src/${dirs}/${file}`, componentTemplate(name).replace(/<walim>/g, '`'))
  })
}

function initConfig(rootDir) {
  const projectConfig = JSON.stringify(require('../config/project.json'), null, 2) + os.EOL
  fs.writeFileSync(`${rootDir}/project.json`, projectConfig)

  const packageConfig = JSON.stringify(require('../config/package.json'), null, 2) + os.EOL
  fs.writeFileSync(`${rootDir}/package.json`, packageConfig)

  fs.writeFileSync(`${rootDir}/.gitignore`, gitignore())
  fs.writeFileSync(`${rootDir}/webpack.common.js`, webpackCommon())
  fs.writeFileSync(`${rootDir}/webpack.config.js`, webpackConfig())
  fs.writeFileSync(`${rootDir}/webpack.prod.js`, webpackProd())
  fs.writeFileSync(`${rootDir}/webpack.dev.js`, webpackDev())
}

function initModuleExport(rootDir) {
  let filePath = `${rootDir}/src/pages/index.js`
  fs.writeFileSync(filePath, '')
  pages.forEach(page => {
    page = page.split('/')
    const relativePath = `./${page.slice(1, 2).join()}`
    const data = `export * from '${relativePath}'\n`
    fs.appendFileSync(filePath, data)
  })

  filePath = `${rootDir}/src/components/index.js`
  fs.writeFileSync(filePath, '')
  components.forEach(component => {
    component = component.split('/')
    const relativePath = `./${component.slice(1, 2).join()}`
    const data = `export * from '${relativePath}'\n`
    fs.appendFileSync(filePath, data)
  })
}

function initRoutes(rootDir) {
  const filePath = `${rootDir}/src/routes.js`
  const modules = pages.map(page => getClassName(page.split('/')[1])).join(',')
  fs.writeFileSync(filePath, routesTemplate(modules))
}

function initApplication(rootDir) {
  const filePath = `${rootDir}/src/application.js`
  const data = [
    `import history from 'history/hash'`,
    `import { Application } from 'walim'`,
    `import routes from './routes'\n`,
    `new Application({ routes, history })`,
  ].join('\n')
  fs.writeFileSync(filePath, data)

}