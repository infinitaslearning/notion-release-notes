const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const body = core.getInput('body');
  console.log(`${body}`);  
  core.setOutput("status", "complete");
} catch (error) {
  core.setFailed(error.message);
}
