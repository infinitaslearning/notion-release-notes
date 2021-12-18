const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const body = core.getInput('body');
  const token = core.getInput('token');
  const database = core.getInput('database');
  console.log(`${body} ${token} ${database}`);  
  core.setOutput("status", "complete");
} catch (error) {
  core.setFailed(error.message);
}
