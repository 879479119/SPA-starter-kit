import {combineReducers} from 'redux'
import common from './common'
import fun from '../containers/main/reducers/fun'

export default combineReducers ({
  common,
  fun
})
