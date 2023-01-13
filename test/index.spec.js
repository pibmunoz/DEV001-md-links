jest.mock('node-fetch');
const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');
const { pathExists, getAbsolutePath, isFileOrDirectory, readDirectory, isMarkdown, pathJoinDirectory, getLinks, getLinksValidated, readFile, readFileValidated, mdLinks } = require('../src/module/index.js');

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
// describe('readFile', () => {
//     it('should be a function', () => {
//         expect(typeof readFile).toBe('function');
//     });
//     it('should return ', () => {

//     })
// });



