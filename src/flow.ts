import * as prompts from "prompts";
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
            min:1,
            initial: null
        });

        // We get the diff so we reduce the answers from the original array to get the unwanted
        const diff = getArrayDiff(paths,data.paths)
        badPaths.push(...diff);
    }
    return badPaths;
}
