import path from 'path'
import test from 'ava'
import sao from 'sao'

const generator = path.join(__dirname, '..')

const verifyPkg = async (t, answers) => {
  const stream = await sao.mock({ generator }, answers)
  const pkg = await stream.readFile('package.json')
  t.snapshot(stream.fileList, 'Generated files')
  t.snapshot(getPkgFields(pkg), 'package.json')

  if(answers && answers.features.includes('linter')){
    const lintFile = await stream.readFile('.eslintrc.js')
    t.snapshot(lintFile, '.eslintrc.js')
  }
}

const getPkgFields = (pkg) => {
  pkg = JSON.parse(pkg)
  delete pkg.description
  return pkg
}

test('defaults', async t => {
  await verifyPkg(t)
})

test('only bili', async t => {
  await verifyPkg(t,{
    features: [],
    test: false,
    build: 'bili'
  })
})

test('only babel', async t => {
  await verifyPkg(t,{
    features: [],
    test: false,
    build: 'babel'
  })
})

test('launch test', async t => {
  await verifyPkg(t,{
    features: [],
    test: true
  })
})

test('launch linter', async t => {
  await verifyPkg(t,{
    features: ['linter']
  })
})


test('launch prettier', async t => {
  await verifyPkg(t,{
    features: ['prettier']
  })
})
