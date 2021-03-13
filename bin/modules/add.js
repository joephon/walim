const path = require('path')
const os = require('os')
const fs = require('fs')
const { execSync } = require('child_process')
const { help } = require('./common')
const { getNames } = require('./utils')
const { pageTemplate } = require('../template/page')
const { componentTemplate } = require('../template/component')
const $ = require('shelljs')

module.exports.addPage = (options) => {
    const cwd = process.cwd()
    const projectObj = require(`${cwd}/project.json`)
    const [comName] = options
    const which = 'pages'
    const { className, rawName, formatName, fileName, dirName } = getNames(comName)
    const comPath = `pages/${fileName}/index`

    if (projectObj[which].indexOf(comPath) !== -1) {
        return
    }

    const obj = { cwd, projectObj, which, path: comPath, className, rawName, formatName, fileName, dirName }

    updateProjectConfig(obj)
    initComponent(obj)
    initModuleExport(obj)
}

module.exports.addCom = (options) => {
    const cwd = process.cwd()
    const projectObj = require(`${cwd}/project.json`)
    const [comName] = options
    const which = 'components'
    const { className, rawName, formatName, fileName, dirName } = getNames(comName)
    const comPath = `components/${fileName}/index`

    if (projectObj[which].indexOf(comPath) !== -1) {
        return
    }

    const obj = { cwd, projectObj, which, path: comPath, className, rawName, formatName, fileName, dirName }

    updateProjectConfig(obj)
    initComponent(obj)
    initModuleExport(obj)
}

function updateProjectConfig(obj) {
    obj.projectObj[obj.which] = obj.projectObj[obj.which].concat([obj.path])
    const projectConfig = JSON.stringify(obj.projectObj, null, 2) + os.EOL
    fs.writeFileSync(`${obj.projectObj.rootDir}/project.json`, projectConfig)
}

function initComponent(obj) {
    const dirs = obj.path.split('/').slice(0, -1).join('/')
    const filePath = obj.path.split('/').slice(obj.path.split('/').length - 1, obj.path.split('/').length) + '.js'
    $.mkdir('-p', `${obj.projectObj.rootDir}/src/${dirs}`)
    fs.writeFileSync(`${obj.projectObj.rootDir}/src/${dirs}/${filePath}`, componentTemplate(obj.className).replace(/<walim>/g, '`'))
}

function initModuleExport(obj) {
    const fileTargetPath = `${obj.projectObj.rootDir}/src/${obj.which}/index.js`
    const filePath = obj.path.split('/')
    const relativePath = `./${filePath.slice(1, 2).join()}`
    const data = `export * from '${relativePath}'\n`
    fs.appendFileSync(fileTargetPath, data)
}

function initRoutes(obj) {
    const filePath = `${obj.projectObj.rootDir}/src/routes.js`
    const modules = obj.projectObj[obj.which].map(path => getNames(path.split('/')[1])).join(',')
    fs.writeFileSync(filePath, routesTemplate(modules))
}