import * as http from '@actions/http-client'
import * as core from '@actions/core'
import {get_id} from "./url-helper";

const client = new http.HttpClient('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')

export async function http_get(url: string): Promise<string> {
    const headers = {
        [':authority']: 'amp-api.music.apple.com',
        [':method']: 'GET',
        [':path']: `/v1/catalog/cn/playlists/${get_id(url)}?art%5Burl%5D=f&extend=editorialArtwork%2CeditorialVideo%2Coffers%2CtrackCount&fields%5Balbums%5D=name%2Cartwork%2CplayParams&fields%5Bapple-curators%5D=name%2Curl&fields%5Bartists%5D=name%2Cartwork&fields%5Bcurators%5D=name%2Curl&fields%5Bsongs%5D=name%2CartistName%2CcuratorName%2CcomposerName%2Cartwork%2CplayParams%2CcontentRating%2CalbumName%2Curl%2CdurationInMillis%2CaudioTraits%2CextendedAssetUrls&format%5Bresources%5D=map&include=tracks%2Ccurator&include%5Bmusic-videos%5D=artists&include%5Bsongs%5D=artists&l=zh-Hans-CN&limit%5Btracks%5D=300&limit%5Bview.contributors%5D=15&limit%5Bview.featured-artists%5D=15&limit%5Bview.more-by-curator%5D=15&omit%5Bresource%5D=autos&platform=web&views=contributors%2Cfeatured-artists%2Cmore-by-curator`,
        [':scheme']: 'https',
        ['accept']: '*/*',
        ['accept-encoding']: 'gzip, deflate, br',
        ['accept-language']: 'zh-CN,zh;q=0.9',
        ['authorization']: 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNjY3MjQzOTEzLCJleHAiOjE2NzQ1MDE1MTMsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.UepSWMlKT8MHbe1eUvQhmANUBr2KIBRrEH15ZQgG0MkdLJZoABzeEmunsaLuf5S9dM_nHQpJ7PdoK619Rim0tQ',
        ['cache-control']: 'no-cache',
        ['cookie']: 'geo=CN',
        ['origin']: 'https://music.apple.com',
        ['pragma']: 'no-cache',
        ['referer']: 'https://music.apple.com',
        ['sec-ch-ua']: '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        ['sec-ch-ua-mobile']: '?0',
        ['sec-ch-ua-platform']: 'Windows',
        ['sec-fetch-dest']: 'empty',
        ['sec-fetch-mode']: 'cors',
        ['sec-fetch-site']: 'same-site'
    }

    const res = await client.get(
        url,
        headers
    )
    if (res.message.statusCode == 200) {
        return await res.readBody()
    } else {
        core.debug(await res.readBody())
        core.setFailed("Didn't get a 200 status code")
        return '{}'
    }
}