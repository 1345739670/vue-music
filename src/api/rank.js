import { commonParams, options } from './config'
import jsonp from '../common/js/jsonp'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'jsonp',
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid: topid,
    needNewCode: 1,
    platform: 'h5',
    page: 'detail',
    type: 'top',
    tpl: 3,
    uin: 0
  })
  return jsonp(url, data, options)
}
