import loadFixture from "../load-fixture";

describe('functional suite', () => {
    it('should return something', async () => {
        const fixture = loadFixture('same-file-different-dirs');
        expect(fixture).toEqual('exists');
    });
})
