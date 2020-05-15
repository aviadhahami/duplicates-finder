import * as path from "path";

export const getFileName = p => path.basename(p).replace(/(.*)\..*/, '$1');
export const getFileExtension = p => path.basename(p).replace(/.*\.(.*)/,'$1');
