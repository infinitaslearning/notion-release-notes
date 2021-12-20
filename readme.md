# Notion Release Notes

This action allows you to specify an existing database in your Notion workspace, and create a new entry each time your action runs.  This is currently specifically aimed at release notes, but could be used for a more generic purpose if you like, fields are kept purposefully quite generic.

This would typically be used alongside https://github.com/mikepenz/release-changelog-builder-action to actually programmatically build the release notes based on tags / pull-requests.

## Notion integration and token

First, you need to have an integration access token - which you can get from https://www.notion.so/my-integrations after creating an integration.  Give the integration a friendly name like 'Github Action Release Notes'.

By default integrations cant access any content so you you *must* share your database with the integration you created earlier to be able to access it!

## Notion Database

This action expects a Notion database with the following properties:

  - Name: text
  - Date: date
  - Tags: tags

You can use the following template and duplicate it: https://infinitaslearning.notion.site/Notion-Release-Notes-a97bedb581464a3ea24159d8eac576c0

It can look like this:

<img width="981" alt="Screenshot 2021-12-18 at 08 55 42" src="https://user-images.githubusercontent.com/239305/146633970-5e1baaf8-6457-4664-b56c-284355e3b241.png">

And each actual page contains whatever your release notes are:

<img width="765" alt="Screenshot 2021-12-18 at 08 56 44" src="https://user-images.githubusercontent.com/239305/146633996-116ff1af-5fe7-4642-ab65-3c0f6ccedf1e.png">

## Usage

Typically this is used with a changelog builder:

```yaml
- name: Release Changelog Builder
    uses: mikepenz/release-changelog-builder-action@v2.7.1
    id: build_changelog
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}   
- name: Notion release notes        
  uses: infinitaslearning/notion-release-notes@main        
  with:          
    token: ${{ secrets.NOTION_TOKEN }}
    database: 619f0845c68a4c18837ebdb9812b90c0
    name: Super Amazing Service    
    tags: segment,team,service-name
    body: ${{ steps.build_changelog.outputs.changelog }}
```

To get the database ID, simply browse to it, click on the '...' and get a 'Copy link'.  The GUID at the end of the URL is the id.

## Development

Assumes you have `@vercel/ncc` installed globally, you need a `NOTION_TOKEN` in your environment for the tests to pass.
After changes ensure you `npm run build`, commit and then submit a PR.
