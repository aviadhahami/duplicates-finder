import * as fse from 'fs-extra'
import * as path from 'path'
import {run as app} from './../../src/flow';

const prompts = require('prompts');

const AUTOGEN_TEST_BASE_PATH = path.resolve(__dirname, '..', 'fixtures', 'auto-generated');
const directoryStructure = [
    'tmp/test.txt',
    'test.txt',
    'tmp/tmp1/test.ttt',
    'test/tmp24/test.txt',
    'test/test.txt',
    'a/b/c/d/not-test.doncare',
    'a.txt',
    'a/a.tes'
].map(p => path.resolve(AUTOGEN_TEST_BASE_PATH, p));

beforeAll(() => {
    directoryStructure.forEach(fse.outputFileSync);
})
afterAll(() => {
    fse.removeSync(AUTOGEN_TEST_BASE_PATH);
});


describe('full cycle', () => {
    it('Happy path!', async () => {
        prompts.inject([
            AUTOGEN_TEST_BASE_PATH,
            ['a.txt'].map(p=>path.resolve(AUTOGEN_TEST_BASE_PATH, p)),
            ['test.txt'].map(p=>path.resolve(AUTOGEN_TEST_BASE_PATH, p)),
            true,
        ]);
        await app();
    });
})
