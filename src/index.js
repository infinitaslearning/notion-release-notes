const core = require('@actions/core')
const { Client, LogLevel } = require('@notionhq/client')
const { markdownToBlocks } = require('@tryfabric/martian')

try {
  // `who-to-greet` input defined in action metadata file
  const body = core.getInput('body')
  const name = core.getInput('name')
  const token = core.getInput('token')
  const tags = core.getInput('tags') || ''
  const database = core.getInput('database')
  const date = new Date().toISOString()

  core.debug('Creating notion client ...')
  const notion = new Client({
    auth: token,
    logLevel: LogLevel.ERROR
  })

  const blocks = markdownToBlocks(body)
  const tagArray = tags ? tags.split(',').flatMap(tag => { return { name: tag } }) : []

  core.debug('Creating page ...')
  notion.pages.create({
    parent: {
      database_id: database
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name
            }
          }
        ]
      },
      Date: {
        date: {
          start: date
        }
      },
      Tags: {
        multi_select: tagArray
      }
    },
    children: blocks
  }).then((result) => {
    core.debug(`${result}`)
    core.setOutput('status', 'complete')
  })
} catch (error) {
  core.setFailed(error.message)
}
