import * as fs from 'fs'

const isDirectory = (p: string): boolean => {
    return fs.lstatSync(p).isDirectory();
}
export {isDirectory}
