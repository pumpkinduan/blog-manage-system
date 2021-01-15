import { controlGlobalLoading } from './loading'
import { initAdminInfo } from './user'
import { combineReducers } from 'redux'

export const appReducer = combineReducers({
    globalLoading: controlGlobalLoading,
    adminInfo: initAdminInfo
})
export type RootState = ReturnType<typeof appReducer>;