import * as prompts from 'prompts'
import {isDirectory} from "./fs-helpers";
import {findDuplicatesInPath} from "./find-duplicates-in-path";

async function run() {
    const root = await prompts({
        type: 'text',
        name: 'path',
        message: 'Please enter directory',
        validate: isDirectory
    });
    const dupes = findDuplicatesInPath(root.path);
    console.log({'dupes': dupes});
}

run();
