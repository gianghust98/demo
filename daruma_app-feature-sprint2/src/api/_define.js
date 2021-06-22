// ファイルリストを取得
const fs = require('fs')
const path = require('path')

const sourceDir = __dirname
const ext = '.js'


main()
function main() {
  walk(sourceDir, (filePath) => {
    if (path.extname(filePath) === ext && filePath !== __filename) {
      conver(filePath)
    }
  }, (err) => {
    // console.log(`Receive err:${err}`)
  })
}

function conver(file) {
  // load js file
  fs.readFile(file, 'utf8', (err, text) => {
    if (text.indexOf('gql\`') === -1) return

    const outputDir = `${path.dirname(file)}/_define`
    // match gql``
    const list = text.match(/\`([^\`]*)\`/g)
    let outputText = ''
    if (!list) return

    // replace text to gql format
    for (let i = 0; i < list.length; i += 1) {
      let str = list[i]
      str = str.replace('\`', '').replace('\`', '')
      outputText += str
    }
    // output
    const output = `${outputDir}/${path.basename(file).replace(ext, '.gql')}`
    fs.writeFileSync(output, outputText)
  })
}

function walk(p, fileCallback, errCallback) {
  fs.readdir(p, (err, files) => {
    if (err) {
      errCallback(err)
      return
    }
    files.forEach((f) => {
      const fp = path.join(p, f)
      if (fs.statSync(fp).isDirectory()) {
        walk(fp, fileCallback)
      } else {
        fileCallback(fp)
      }
    })
  })
}
