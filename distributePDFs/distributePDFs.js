// Distribute PDFs in Base directory to Packaged directory

const fs = require("fs")
const path = require("path")

if (process.argv.length !== 4) {
  console.error(`This script's signature: ${process.argv[0]} ${process.argv[1]} baseDirectory packagedDirectory}`)
  return
}

const baseDir = process.argv[2]
const packagedDir = process.argv[3]

const panelDirs = fs.readdirSync(baseDir)

for (let panelDir of panelDirs) {
  if (panelDir !== ".DS_Store") {
    console.log(`Working in ${panelDir}`)
    const pdfsDir = path.join(baseDir, panelDir, "_PDFs")
    const pdfs = fs.readdirSync(pdfsDir)

    for (let pdfFile of pdfs) {
      if (pdfFile !== ".DS_Store")  {
        const fileBaseName = pdfFile.replace(/\.pdf$/, "")
        const srcPath = path.join(baseDir, panelDir, "_PDFs", pdfFile)
        const destPath = path.join(packagedDir, panelDir, fileBaseName, pdfFile)

        console.log(`Copying ${pdfFile}`)
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}
