const glob = require('glob')
const fs = require('fs')
const sass = require('sass')
const concat = require('concat')

const scssFiles = glob.sync('src/**/**/*.scss') // all SCSS files in src

const tempFiles = scssFiles.map((file) => {
  const result = sass.renderSync({ file })
  const tempPath = file.replace('src', 'dist').replace('.scss', '.css')
  fs.mkdirSync(require('path').dirname(tempPath), { recursive: true })
  fs.writeFileSync(tempPath, result.css)
  return tempPath
})

// Merge all CSS into a single file
concat(tempFiles, 'dist/index.css')
console.log('All SCSS compiled into dist/index.css')
