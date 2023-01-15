jest.mock('node-fetch');
const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const { getAbsolutePath, isFileOrDirectory, isMarkdown, pathJoinDirectory, getLinks, getLinksValidated, mdLinks } = require('../src/module/index.js');

describe('getAbsolutePath', () => {
    it('should be a function', () => {
        expect(typeof getAbsolutePath).toBe('function');
    });
    it('should return an absolute path', () => {
        expect(getAbsolutePath('sample_folder/sample_two.md')).toBe('C:\\Users\\pilar\\OneDrive\\Escritorio\\DEV001-md-links\\sample_folder\\sample_two.md');
    });
    it('should return the same path if the path is already absolute', () => {
        expect(getAbsolutePath('C:\\Users\\pilar\\OneDrive\\Escritorio\\DEV001-md-links\\sample_folder\\sample_two.md')).toBe('C:\\Users\\pilar\\OneDrive\\Escritorio\\DEV001-md-links\\sample_folder\\sample_two.md');
    })
});
describe('isFileOrDirectory', () => {
    it('should be a function', () => {
        expect(typeof isFileOrDirectory).toBe('function');
    });
    it('should return "file" when the path is a file', () => {
        expect(isFileOrDirectory('sample_folder/sample_two.md')).toBe('file');
    });
    it('should return "directory" when the path is a directory', () => {
        expect(isFileOrDirectory('sample_folder')).toBe('directory');
    });
});

describe('isMarkdown', () => {
    it('should be a function', () => {
        expect(typeof isMarkdown).toBe('function');
    });
    it('should return true if the file is a markdown file', () => {
        expect(isMarkdown('sample_folder/sample_two.md')).toBe(true);
    });
    it('should return false if the file is not a markdown file', () => {
        expect(isMarkdown('sample_folder/sample_two.txt')).toBe(false);
    });
});

describe('pathJoinDirectory', () => {
    it('should be a function', () => {
        expect(typeof pathJoinDirectory).toBe('function');
    });
    it('should return the path of the file to be read', () => {
        expect(pathJoinDirectory('sample_folder', 'sample_two.md')).toBe('sample_folder\\sample_two.md');
    });
});


describe('getLinks', () => {
    it('should be a function', () => {
        expect(typeof getLinks).toBe('function');
    });
    it('should return an array of objects with the links and the text', () => {
        expect(getLinks('[Google](https://www.google.com)', 'sample_folder/sample_two.md')).toEqual([{
            href: 'https://www.google.com',
            text: 'Google',
            file: 'sample_folder/sample_two.md'
        }]);
    });
});

describe('getLinksValidated', () => {
    it('should be a function', () => {
        expect(typeof getLinksValidated).toBe('function');
    });
    it('should return an array of objects with the links and the text', () => {
        fetch.mockReturnValue(Promise.resolve(new Response({status: 200, ok: true})));
        const response = getLinksValidated('[Google](https://www.google.com)', 'sample_folder/sample_two.md');
        expect(response).resolves.toEqual([{
            href: 'https://www.google.com',
            text: 'Google',
            file: 'sample_folder/sample_two.md',
            status: 200,
            ok: 'ok'
        }]);
    });
});

describe('mdLinks', () => {
    it('should be a function', () => {
        expect(Object.prototype.toString.call(mdLinks('sample_folder').then()) === "[object Promise]").toBe(true);
    });
    it('should return an array of objects with the links and the text', () => {
        expect(mdLinks('sample_folder/sample_two.md')).resolves.toStrictEqual([{
            href: 'https://www.google.cl',
            text: 'Google',
            file: "C:\\Users\\pilar\\OneDrive\\Escritorio\\DEV001-md-links\\sample_folder\\sample_two.md"
        }]);
    });
});




