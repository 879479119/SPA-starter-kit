import {combineReducers} from 'redux'
import common from './common'
import fun from '../containers/main/reducers/fun'
import {SimpleAPIReducer} from '../utils/fetch'

export default combineReducers ({
  common,
  fun,
  SimpleAPIReducer
})
