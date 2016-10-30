import {combineReducers} from 'redux'
import common from './common'
import pagination from './pagination'
import fun from '../containers/main/reducers/fun'
import animation from '../containers/main/reducers/animation'
import {SimpleAPIReducer} from '../utils/fetch'

export default combineReducers ({
  common,
  fun,
  animation,
  pagination,
  SimpleAPIReducer
})
