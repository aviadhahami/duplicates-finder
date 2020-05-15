import loadFixture from "../load-fixture";
import {findDuplicatesInPath} from "../../src/find-duplicates-in-path";

it('should find duplicates in path', async () => {
    const fixture = loadFixture('same-file-different-dirs');
    const dupes = await findDuplicatesInPath(fixture);
    expect(dupes?.length).toEqual(1);
    const dupe = dupes[0];
    expect(dupe?.name).toEqual('1.txt');
    expect(dupe?.paths.sort()).toEqual([
        '/home/aviad/Documents/code/private/duplicates-finder/tests/fixtures/same-file-different-dirs/a/b/1.txt',
        '/home/aviad/Documents/code/private/duplicates-finder/tests/fixtures/same-file-different-dirs/another-dir/1.txt',
        '/home/aviad/Documents/code/private/duplicates-finder/tests/fixtures/same-file-different-dirs/1.txt'
    ].sort());
});
