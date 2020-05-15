import getAllFiles from 'get-all-files'
import * as path from 'path'

const getFileName = p => path.basename(p);

/**
 * Assumption is that all paths exist;
 * Will receive a path in the FS;
 * Will return an array of the DuplicateEntry
 * @param root
 */
function findDuplicatesInPath(root: string): DuplicateResult[] {

    const files = getAllFiles.sync.array(root);
    const cache = new Map<string, string[]>();
    files.forEach(file => {
        const name = getFileName(file);
        if (!cache.has(name)) {
            cache.set(name, [file]);
        } else {
            cache.set(name, cache.get(name).concat(file));
        }
    });

    return [...cache].map(([name, paths]) => ({name, paths})) as DuplicateResult[];
}

export {
    findDuplicatesInPath
}
