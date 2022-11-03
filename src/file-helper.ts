import * as glob from '@actions/glob'

export async function find_file(name: string): Promise<string> {
    const globber = await glob.create(`**/${name}`)
    const files = await globber.glob()
    return files[0]
}

export function replaceTimes(orig:string, oldVal:string, newVal:string, times:number):string {
    let returnVal
    for (let i = 0; i<times; i++) {
        returnVal = orig.replace(oldVal,newVal)
    }
    return returnVal
}