const core = require('@actions/core');
const github = require('@actions/github');
const { Client, LogLevel } = require('@notionhq/client')
const { markdownToBlocks } = require('@tryfabric/martian')

try {
  // `who-to-greet` input defined in action metadata file
  const body = core.getInput('body');
  const token = core.getInput('token');
  const database = core.getInput('database');

  core.debug(`Creating notion client ...`)
  const notion = new Client({
	  auth: token,
	  logLevel: LogLevel.ERROR
  });
  
  const blocks = markdownToBlocks(body);

  core.debug(`Creating page ...`)
  notion.pages.create({
    parent: {      
      database_id: database,  
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: 'Release',
            },
          },
        ],
      },
  	},
  	children: blocks,
  }).then((result) => {
  	core.debug(`${result}`)
  	core.setOutput("status", "complete");	
  });
 
} catch (error) {
  core.setFailed(error.message);
}
