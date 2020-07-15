import { showGlobalLoading } from './showGlobalLoading'
import { combineReducers } from 'redux'

export const appReducer = combineReducers({
    globalLoading: showGlobalLoading
})