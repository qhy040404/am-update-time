export function get_id(orig:string):string {
    const splits = orig.split("/")
    return splits[splits.length-1]
}

export function generate_status_url(url:string):string {
    return `https://amp-api.music.apple.com/v1/catalog/cn/playlists/${get_id(url)}?art[url]=f&extend=editorialArtwork,editorialVideo,offers,trackCount&fields[albums]=name,artwork,playParams&fields[apple-curators]=name,url&fields[artists]=name,artwork&fields[curators]=name,url&fields[songs]=name,artistName,curatorName,composerName,artwork,playParams,contentRating,albumName,url,durationInMillis,audioTraits,extendedAssetUrls&format[resources]=map&include=tracks,curator&include[music-videos]=artists&include[songs]=artists&l=zh-Hans-CN&limit[tracks]=300&limit[view.contributors]=15&limit[view.featured-artists]=15&limit[view.more-by-curator]=15&omit[resource]=autos&platform=web&views=contributors,featured-artists,more-by-curator`
}