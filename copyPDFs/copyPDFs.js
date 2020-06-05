const fs = require("fs")
const path = require("path")

const src = process.argv[2]
const dest = process.argv[3]

const caseDirs = fs.readdirSync(src)
for (let dir of caseDirs) {
  if (dir !== ".DS_Store") {
    console.log(`Working on ${dir}`)

    const destDir = path.join(dest, dir)
    fs.mkdirSync(destDir)

    const pdfsDir = path.join(src, dir, "_PDFs")

    const pdfs = fs.readdirSync(pdfsDir)

    for (let pdf of pdfs) {
      if (pdf.split(".")[1].toLowerCase() === "pdf") {
        const copySrc = path.join(pdfsDir, pdf)
        const copyDest = path.join(destDir, pdf)
        
        console.log(`Copying ${pdf} to ${copyDest}`)

        fs.copyFileSync(copySrc, copyDest)
      }
    }
  }
}
