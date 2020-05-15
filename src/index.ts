import {findDuplicatesInPath} from "./find-duplicates-in-path";
import {deleteFileAtPath, getPathsToRemove, getRootDirectory} from "./flow";

async function run() {
    console.log(process.env.NODE_ENV);
    const root = await getRootDirectory();
    console.log('Finding dupes in path....');
    const dupes = findDuplicatesInPath(root);
    console.log('We will now iterate over the results, pay attention!');
    const pathsToRemove = await getPathsToRemove(dupes);
    console.log(`Will now remove ${pathsToRemove.length} paths`);
    await deleteFileAtPath(pathsToRemove);
    console.log('Done! exiting');
}

run();
