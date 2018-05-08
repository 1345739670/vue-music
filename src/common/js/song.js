export default class Song {
  constructor ({id, mid, singer, name, album, duration, image}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = ''
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // 暂时不加
    // url: 'http://dl.stream.qqmusic.qq.com/C400004emQMs09Z1lz.m4a?vkey=B6BFE42F2BD1A7E2151C6255384359CD66B7C384C7CE737E0A55F290F7563552416692D2EB1DF46B99B8EA13EAD0E7F6BE7F0E9294829C97&guid=1448357960&uin=0&fromtag=66'
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
