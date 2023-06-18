const path = require('path')
const process = require('process')
const cp = require('child_process')

jest.setTimeout(180000)

test('complete input should succeed with default inputs', () => {
  process.env.INPUT_DATABASE = '619f0845c68a4c18837ebdb9812b90c0'
  process.env.INPUT_TOKEN = process.env.NOTION_TOKEN
  process.env.INPUT_NAME = 'Awesome release'
  process.env.INPUT_FILEPATH = ''

  const ip = path.join(__dirname, 'index.js')
  const options = {
    env: process.env
  }
  const result = cp.execSync(`node ${ip}`, options).toString()
  expect(result).toBeDefined()
})
