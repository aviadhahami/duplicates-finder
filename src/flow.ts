import * as prompts from "prompts";
import * as fs from 'fs';
import {isDirectory} from "./fs-helpers";
import {DuplicateResult} from "./types/types";
import {getFileExtension} from "./file-helpers";
import {getArrayDiff} from "./get-array-diff";

export async function getRootDirectory() {
    const root = await prompts({
        type: 'text',
        name: 'path',
        message: 'Please enter directory',
        validate: isDirectory
    });
    return root.path;
}

export async function getPathsToRemove(dupes: DuplicateResult[]): Promise<string[]> {
    const badPaths = [];
    for (const dupe of dupes) {
        const {name, paths} = dupe
        const data = await prompts({
            type: 'multiselect',
            name: 'paths',
            message: `Filename: "${name}" -- pick what to SAVE`,
            choices: paths.map(p => ({
                title: p, // we show path
                description: `${getFileExtension(p)} file`,
                value: p
            })),
            min: 1,
            initial: null
        });

        // We get the diff so we reduce the answers from the original array to get the unwanted
        const diff = getArrayDiff(paths, data.paths)
        badPaths.push(...diff);
    }
    return badPaths;
}

async function safeGuardDelete() {
// Anything but dev or test
    const shouldDelete = !['development', 'test'].includes(process.env.NODE_ENV);
    let actuallyDelete = false;
    if (shouldDelete) {
        // Activate safe guard
        const {confirm = false} = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: `SAFE GUARD! are you sure you'd like to ACTUALLY delete files?! [PRODUCTION MODE]`,
            initial: false
        });
        if (confirm) {
            actuallyDelete = true;
        }
    }
    return actuallyDelete;
}

export async function deleteFileAtPath(paths: string[]): Promise<undefined> {

    const shouldDelete = await safeGuardDelete();
    paths.forEach(p => {
        try {
            if (shouldDelete) {
                fs.unlinkSync(p)
            } else {
                console.log('pretending to unlink', p);
            }
        } catch (e) {
            console.log(`Couldn't delete file at path ${p}`);
            console.log(e);
        }
    })
    return;
}
