# Notion Release Notes

This action allows you to specify an existing database in your Notion account that it can add a release note to within an action.

Typically used alongside https://github.com/mikepenz/release-changelog-builder-action

## Notion token

You need to have set `env.NOTION_TOKEN` - which you can get from https://www.notion.so/my-integrations after creating an integration.

## Notion Database

This action expects a Notion database with the following properties:

Name: text
Date: date
Tags: tags

It can look like this:

<img width="981" alt="Screenshot 2021-12-18 at 08 55 42" src="https://user-images.githubusercontent.com/239305/146633970-5e1baaf8-6457-4664-b56c-284355e3b241.png">

And each actual page contains whatever your release notes are:

<img width="765" alt="Screenshot 2021-12-18 at 08 56 44" src="https://user-images.githubusercontent.com/239305/146633996-116ff1af-5fe7-4642-ab65-3c0f6ccedf1e.png">

## Usage

```
- name: Notion release notes        
  uses: infinitaslearning/notion-release-notes@main        
  with:          
    token: ${{ secrets.NOTION_TOKEN }}
    database: 619f0845c68a4c18837ebdb9812b90c0
    name: Release    
    tags: tag,comma,separated
    body: ${{ steps.build_changelog.outputs.changelog }}
```

To get the database ID, simply browse to it, click on the '...' and get a 'Copy link'.  The GUID at the end of the URL is the id.

## Development

Assumes you have `@vercel/ncc` installed globally.

After changes ensure you `npm run build` and then push.
