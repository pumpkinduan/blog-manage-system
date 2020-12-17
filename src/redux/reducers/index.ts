import { showGlobalLoading } from './loading'
import { appendUserInfo } from './user'
import { combineReducers } from 'redux'

export const appReducer = combineReducers({
    globalLoading: showGlobalLoading,
    userInfo: appendUserInfo
})

export type appState = ReturnType<typeof appReducer>;