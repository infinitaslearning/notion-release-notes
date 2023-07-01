/* The purpose of this function is to take either a string of markdown content or a path to a markdown file,
 * convert the markdown into blocks for notion, then add that content to notion
 * Inputs from core:
 *  filepath: either the relative filepath to a markdown file or a string of markdown content
 *  name: the name of the notion page to create
 *  token: the integration token for notion
 *  database: the guid of the database root page on notion
 */

const core = require('@actions/core')
const { Client, LogLevel } = require('@notionhq/client')
const { markdownToBlocks } = require('@tryfabric/martian')
const fs = require('fs')

// create an empty notion objection
let notion = {}

function main () {
  try {
    // read in filepath, name, token, and database from core
    const filepath = core.getInput('filepath')
    const name = core.getInput('name')
    const token = core.getInput('token')
    const database = core.getInput('database')

    if (filepath === '') {
      throw new Error('No filepath provided.')
    }
    core.debug('Creating notion client ...')
    // init the notion client
    notion = new Client({
      auth: token,
      logLevel: LogLevel.ERROR
    })
    // if the filepath passed in ends with ".md", we assume it is a filepath to a markdown file
    if (filepath.endsWith('.md')) {
      // read the conotents of the filepath
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
          core.setFailed(err.message)
          return
        }
        // pass the contents to the addToNotion function
        addToNotion({
          content: data,
          name,
          database
        })
      })
    } else {
      // else its assumed to be a string of markdown, so we just pass it to the addToNotion function
      addToNotion({
        content: filepath,
        name,
        database
      })
    }
  } catch (error) {
    // if any errors alert github action of failure
    core.setFailed(error.message)
  }
}
// this function takes in a data object that consists of the content, database, and page name to be created
// it turns the markdown content into notion blocks then creates the page
function addToNotion (data) {
  // convert markdown to blocks
  const blocks = markdownToBlocks(data.content)
  core.debug('blocks: ' + JSON.stringify(blocks, null, 4))
  core.info('Creating page ...')
  // create the notion page with the database and name as the title
  notion.pages.create({
    parent: {
      database_id: data.database
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: data.name
            }
          }
        ]
      }
    },
    children: blocks
  }).then((result) => {
    // when done add success message
    core.debug(`${JSON.stringify(result, null, 4)}`)
    core.info('Successfully added Notion Page')
  })
}

module.exports = main
