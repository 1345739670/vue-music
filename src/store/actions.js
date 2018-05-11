import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {getvkey, getMediaUrl} from 'api/commonApi'
import {ERR_OK} from 'api/config'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, list)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_FULL_SCREEN, true)
  let mid = list[index].mid
  getvkey(mid).then((res) => {
    if (res.code === ERR_OK) {
      let vkey = res.data.items[0].vkey
      let filename = res.data.items[0].filename
      let url = getMediaUrl(filename, vkey)
      commit(types.SET_CURRENT_MUSIC_URL, url)
      // 由于 currentIndex 改变会导致 currentSong 从而导致播放（player组件中watch的currentSong）
      commit(types.SET_CURRENT_INDEX, index)
      commit(types.SET_PLAYING_STATE, true)
    }
  })
}

export const randomPlay = function ({commit}, {list, url}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  let currentSong = randomList[0]
  commit(types.SET_FULL_SCREEN, true)
  getvkey(currentSong.mid).then((res) => {
    if (res.code === ERR_OK) {
      let vkey = res.data.items[0].vkey
      let filename = res.data.items[0].filename
      let url = getMediaUrl(filename, vkey)
      commit(types.SET_CURRENT_MUSIC_URL, url)
      // 由于 currentIndex 改变会导致 currentSong 从而导致播放（player组件中watch的currentSong）
      commit(types.SET_CURRENT_INDEX, 0)
      commit(types.SET_PLAYING_STATE, true)
    }
  })
}
