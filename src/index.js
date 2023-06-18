const core = require('@actions/core')
const { Client, LogLevel } = require('@notionhq/client')
const { markdownToBlocks } = require('@tryfabric/martian')
const fs = require('fs');

try {
  // `who-to-greet` input defined in action metadata file
  const filepath = core.getInput('filepath')
  const name = core.getInput('name')
  const token = core.getInput('token')

  const database = core.getInput('database')

  core.debug('Creating notion client ...')
  const notion = new Client({
    auth: token,
    logLevel: LogLevel.ERROR
  });
 
  if(filepath.endsWith('.md')){
    fs.readFile(filepath, 'utf-8', (err, data)=>{
      if(err){
        core.setFailed(err.message);
        return;
      }
      addToNotion(data, name, database);

    }); 
  }
  else{
    addToNotion(filepath, name, database);
  }
  
} catch (error) {
  core.setFailed(error.message);
}


function addToNotion(data, name, database){
  const blocks = markdownToBlocks(data)
   
  core.debug('blocks: ' + JSON.stringify(blocks, null, 4));
  core.info('Creating page ...')
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
      }
    },
    children: blocks
  }).then((result) => {
    core.debug(`${JSON.stringify(result, null, 4)}`)
    core.info('Successfully added Notion Page');
  });
}
