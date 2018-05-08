import { commonParams, options } from './config'
import jsonp from '../common/js/jsonp'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    g_tk: 5381
  })
  return jsonp(url, data, options)
}
export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    format: 'jsonp',
    inCharset: 'utf8',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 5381,
    singermid: singerId
  })
  return jsonp(url, data, options)
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

export function getMediaUrl (vkey) {
  const guid = 1448357960
  const uin = 0
  const fromtag = 66
  const mediaUrl = `http://dl.stream.qqmusic.qq.com/C400001mhQbn2eKHiR.m4a?vkey=${vkey}&guid=${guid}&uin=${uin}&fromtag=${fromtag}`
  return mediaUrl
}
