import { commonParams, options } from './config'
import axios from 'axios'
import jsonp from '../common/js/jsonp'

export function getLyric (mid) {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: new Date(),
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    g_tk: 5381,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getvkey (songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const _callbackname = `MusicJsonCallback${(Math.random() + '').replace('0.', '')}`
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    callback: _callbackname,
    uin: 0,
    songmid: songmid, //  musicData.songmid
    filename: `C400${songmid}.m4a`, //  变量`C400${musicData.songmid}.m4a`
    guid: 1448357960
  })
  let option = Object.assign({}, options, {
    name: _callbackname
  })
  return jsonp(url, data, option)
}

export function getMediaUrl (filename, vkey) {
  const guid = 1448357960
  const uin = 0
  const fromtag = 66
  const mediaUrl = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${guid}&uin=${uin}&fromtag=${fromtag}`
  return mediaUrl
}
