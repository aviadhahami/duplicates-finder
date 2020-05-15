import * as path from 'path'
import * as fs from 'fs'
function loadFixture(name:string):string {
    if(!name?.length){
        throw Error('Provide fixture name mofo');
    }

    const localPath = path.resolve(__dirname,'fixtures', name);
    if(fs.existsSync(localPath)){
        return localPath;
    }else {
        throw Error('No such fixture')
    }
}

export default loadFixture;
