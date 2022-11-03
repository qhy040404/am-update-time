export function get_id(orig:string):string {
    const splits = orig.split("/")
    return splits[splits.length-1]
}