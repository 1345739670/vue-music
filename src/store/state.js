import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cashe'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  currentMusicUrl: '',
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}
export default state
