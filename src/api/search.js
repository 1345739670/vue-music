import { commonParams, options } from './config'
import jsonp from '../common/js/jsonp'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    format: 'jsonp',
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function search (query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    perpage,
    n: perpage,
    format: 'jsonp',
    needNewCode: 1,
    platform: 'h5',
    uin: 0,
    w: query,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    p: page,
    remoteplace: 'txt.mqq.all'
  })
  return jsonp(url, data, options)
}
