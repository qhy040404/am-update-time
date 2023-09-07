import * as core from "@actions/core"
import * as fs from 'fs-extra'
import {find_file, replaceTimes} from "./file-helper";
import {normal_get} from "./net-helper";

async function run() {
    core.info('Importing inputs')
    const playlist_url = core.getInput('playlist', {required: true})
    const delimiter = core.getInput('keyword', {required: true})

    core.debug(`${playlist_url}\n${delimiter}`)

    if (playlist_url == "") {
        core.setFailed('Playlist url not set')
    }

    const readme = await find_file('README.md')
    core.debug(readme)
    let readme_data: string = fs.readFileSync(readme, 'utf8')

    // Apple API does not work at the moment
    /*let remote = await http_get(generate_status_url(playlist_url))
    core.debug(remote)
    const remote_data = JSON.parse(remote)
    const playlists = remote_data.resources.playlists
    const m_plists = JSON.parse(JSON.stringify(playlists).replace(`${get_id(playlist_url)}`, 'mList'))
    const orig_time: string = m_plists.mList.attributes.lastModifiedDate
    core.info(`Original time from remote: ${orig_time}`)
    const time = replaceTimes(orig_time.split("T")[0], "-", "/", 2)
    core.info(`Remote time: ${time}`)*/

    let remote = await normal_get(playlist_url)
    core.debug(remote)
    const orig_time: string = remote.split('"datePublished":"')[1].split('",')[0]
    core.info(`Original time from remote: ${orig_time}`)
    const time = replaceTimes(orig_time.split("T")[0], "-", "/", 2)
    core.info(`Remote time: ${time}`)

    const pre_time = readme_data.split(delimiter)[1].split("\n")[0].trim()
    core.info(`Previous time: ${pre_time}`)

    readme_data = readme_data.replace(pre_time, time)
    try {
        fs.writeFileSync(readme, readme_data, 'utf8')
        core.info('Overwritten')
    } catch (e) {
        core.error(`${e}`)
    }
}

// noinspection JSIgnoredPromiseFromCall
run()