import { SHOWLOADING, APPEND_USER_INFO, AppendUserInfoAction } from '../actionTypes'

import { UserInterface } from 'interfaces/index.interface'

export const showGlobalLoading = loadingStatus => ({ type: SHOWLOADING, loadingStatus })

export const appendUserInfo = (data: UserInterface.ADMIN): AppendUserInfoAction => ({ type: APPEND_USER_INFO, payload: data })