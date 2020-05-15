import {join} from 'path'
import loadFixture from "../load-fixture";

describe('load fixture suite', () => {
    it('should return fixture exists', async () => {
        const fixture = loadFixture('same-file-different-dirs');
        expect(fixture).toEqual(join(__dirname, '/../', 'fixtures', 'same-file-different-dirs'));
    });
})
