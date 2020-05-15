import * as prompts from 'prompts'
import {findDuplicatesInPath} from "./find-duplicates-in-path";
import {getFileExtension} from "./file-helpers";
import {getPathsToRemove, getRootDirectory} from "./flow";

async function run() {
    const root = await getRootDirectory();
    console.log('Finding dupes in path....');
    const dupes = findDuplicatesInPath(root);
    console.log('We will now iterate over the results, pay attention!');
    const pathsToRemove = await getPathsToRemove(dupes);
    console.log(`Will now remove ${pathsToRemove.length} paths`);
    console.log({'pathsToRemove': pathsToRemove});
}

run();
