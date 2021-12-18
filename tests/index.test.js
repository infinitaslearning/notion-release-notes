const path = require('path')
const process = require('process')
const cp = require('child_process')
const fs = require('fs')

jest.setTimeout(180000)

test('complete input should succeed', () => {  
  process.env['INPUT_DATABASE'] = '619f0845c68a4c18837ebdb9812b90c0'
  process.env['INPUT_TOKEN'] = process.env.NOTION_TOKEN
  process.env['INPUT_BODY'] = 'Hello world'
 
  const ip = path.join(__dirname, '..', 'index.js')
  const options = {
    env: process.env
  }
  const result = cp.execSync(`node ${ip}`, options).toString()
  // should succeed
  // expect(result).toBeDefined()
})