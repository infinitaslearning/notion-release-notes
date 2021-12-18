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