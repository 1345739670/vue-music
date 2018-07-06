import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {getvkey, getMediaUrl} from 'api/song'
import {ERR_OK} from 'api/config'
import {saveSearch, deleteSearch, clearSearch, savePlay} from 'common/js/cashe'

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

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 获取当前歌曲
  let currentSong = playList[currentIndex]
  // 在当前列表中查找是否有待插入的歌曲并返回索引
  let fpIndex = findIndex(playList, song)
  currentIndex++
  playList.splice(currentIndex, 0, song)
  // 如果当前列表已经有了这首要插入的歌
  if (fpIndex > -1) {
    // 当期插入歌曲的索引大于当前列表已有歌曲的索引
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  let mid = playList[currentIndex].mid
  getvkey(mid).then((res) => {
    if (res.code === ERR_OK) {
      let vkey = res.data.items[0].vkey
      let filename = res.data.items[0].filename
      let url = getMediaUrl(filename, vkey)
      commit(types.SET_CURRENT_MUSIC_URL, url)
      commit(types.SET_CURRENT_INDEX, currentIndex)
      commit(types.SET_PLAYING_STATE, true)
    }
  })
  commit(types.SET_FULL_SCREEN, true)
  // commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex === pIndex) {
    // 获取当前歌曲
    let currentSong = playlist[currentIndex]
    getvkey(currentSong.mid).then((res) => {
      if (res.code === ERR_OK) {
        let vkey = res.data.items[0].vkey
        let filename = res.data.items[0].filename
        let url = getMediaUrl(filename, vkey)
        commit(types.SET_CURRENT_MUSIC_URL, url)
      }
    })
  }
  if (currentIndex > pIndex) {
    currentIndex--
  }

  if (currentIndex === playlist.length) {
    currentIndex--
    // 获取当前歌曲
    let currentSong = playlist[currentIndex]
    getvkey(currentSong.mid).then((res) => {
      if (res.code === ERR_OK) {
        let vkey = res.data.items[0].vkey
        let filename = res.data.items[0].filename
        let url = getMediaUrl(filename, vkey)
        commit(types.SET_CURRENT_MUSIC_URL, url)
      }
    })
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
