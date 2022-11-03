import * as http from '@actions/http-client'
import * as core from '@actions/core'
import {get_id} from "./url-helper";

const client = new http.HttpClient('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')

export async function http_get(url: string): Promise<string> {
    const headers = {
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