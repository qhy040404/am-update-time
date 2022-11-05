import * as exec from "@actions/exec"

export async function push(token: string, branch:string) {
    await exec.exec('git commit -am "Update playlist"')
    // @ts-ignore
    await exec.exec(`git push ${process.env.GITHUB_SERVER_URL.trim().split("//")[0]}//${process.env.GITHUB_ACTOR}:${token}@${process.env.GITHUB_SERVER_URL.trim().split("//")[1]}/${process.env.GITHUB_REPOSITORY}.git HEAD:${branch}`)
}