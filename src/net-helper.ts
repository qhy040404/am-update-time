import * as http from '@actions/http-client'
import * as core from '@actions/core'

const client = new http.HttpClient('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')

export async function http_get(url: string): Promise<string> {
    const headers = {
        ['accept']: '*/*',
        ['authorization']: 'Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNjY3MjQzOTEzLCJleHAiOjE2NzQ1MDE1MTMsInJvb3RfaHR0cHNfb3JpZ2luIjpbImFwcGxlLmNvbSJdfQ.UepSWMlKT8MHbe1eUvQhmANUBr2KIBRrEH15ZQgG0MkdLJZoABzeEmunsaLuf5S9dM_nHQpJ7PdoK619Rim0tQ',
        ['cookie']: 'geo=CN',
        ['origin']: 'https://music.apple.com',
        ['pragma']: 'no-cache',
        ['referer']: 'https://music.apple.com',
    }

    const res = await client.get(
        url,
        headers
    )
    if (res.message.statusCode == 200) {
        return res.readBody()
    } else {
        core.debug(await res.readBody())
        core.setFailed("Didn't get a 200 status code")
        return '{}'
    }
}