import * as exec from "@actions/exec"

export async function push(token: string, branch:string) {
    await exec.exec(`git push https://${process.env.GITHUB_ACTOR}:${token}@${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}.git HEAD:${branch}`)
}