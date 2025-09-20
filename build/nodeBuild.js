const fs = require('fs')
const path = require('path')
const sass = require('sass')

// Recursively get all .module.scss files
function getAllScssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      getAllScssFiles(fullPath, fileList)
    } else if (file.endsWith('.module.scss')) {
      fileList.push(fullPath)
    }
  })
  return fileList
}

// Compile each SCSS file to CSS
function compileScssFiles() {
  const scssFiles = getAllScssFiles(path.resolve(__dirname, '../src'))
  scssFiles.forEach((scssFile) => {
    const result = sass.renderSync({ file: scssFile })
    const cssFile = scssFile.replace('.module.scss', '.module.css')
    fs.writeFileSync(cssFile, result.css)
    console.log(`Compiled ${scssFile} → ${cssFile}`)
  })
}

compileScssFiles()
