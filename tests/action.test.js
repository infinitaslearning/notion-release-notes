// index.test.js
const { setFailed } = require('@actions/core');
const { getInput, info } = require('@actions/core');
const { Client, LogLevel } = require('@notionhq/client');
const { markdownToBlocks } = require('@tryfabric/martian');

// Mock external npm packages
jest.mock('@actions/core');
jest.mock('@notionhq/client');
jest.mock('@tryfabric/martian');

// Import the function from index.js
const main  = require('../src/action');

describe('Main function', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should set failed status if filepath is not provided', async () => {
    // Arrange
    getInput.mockReturnValueOnce('');
    Client.mockReturnValueOnce({
      pages: {
        create: async function (obj ={}){
          return true;
        }
      }
    })

    // Act
    await main();

    // Assert
    expect(setFailed).toHaveBeenCalledWith('No filepath provided.');
  });

  test('should call markdownToBlocks with the correct filepath', async () => {
    // Arrange
    const filePath = 'path/to/notion-file.json';
    getInput.mockReturnValueOnce(filePath);

    // Act
    await main();

    // Assert
    expect(markdownToBlocks).toHaveBeenCalledWith(filePath);
  });

  test('should set output with the generated markdown', async () => {
    // Arrange
    const filePath = 'path/to/notion-file.json';
    const generatedMarkdown = 'Generated markdown';
    getInput.mockReturnValueOnce(filePath);
    markdownToBlocks.mockResolvedValueOnce(generatedMarkdown);
    Client.mockReturnValueOnce({
      pages: {
        create: async function (obj ={}){
          return true;
        }
      }
    })
    // Act
    await main();

    // Assert
    expect(info).toHaveBeenCalledWith('Creating page ...');
    expect(info).toHaveBeenCalledWith('Successfully added Notion Page');
  });

  test('should set failed status if markdownToBlocks throws an error', async () => {
    // Arrange
    const filePath = 'path/to/notion-file.json';
    getInput.mockReturnValueOnce(filePath);
    markdownToBlocks.mockImplementation(() => {
      throw new Error('Failed to generate markdown');
    });

    // Act
    await main();

    // Assert
    expect(setFailed).toHaveBeenCalledWith('Failed to generate markdown');
  });
});
