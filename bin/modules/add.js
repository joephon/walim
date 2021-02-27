const path = require('path')
const os = require('os')
const fs = require('fs')
const { execSync } = require('child_process')
const { help } = require('./common')
const { getNames } = require('./utils')
const { pages, components } = require('../config/project.json')
const { pageTemplate } = require('../template/page')
const { componentTemplate } = require('../template/component')
 
module.exports.addCom = (options) => {
    const [comName] = options
    const { className, rawName, formatName, fileName, dirName } = getNames(comName)
    console.log(rawName, formatName, className, fileName, dirName)
}