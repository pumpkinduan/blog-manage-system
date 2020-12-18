import { CONTROL_LOADING, INIT_ADMIN_INFO, ActionResultInterface } from '../actionTypes'
import { UserInterface } from 'interfaces/index.interface'
import { LoadingStateInterface } from 'redux/reducers/loading'

export const controlGlobalLoading = (data: LoadingStateInterface): ActionResultInterface<LoadingStateInterface> => ({ type: CONTROL_LOADING, payload: data })

export const initAdminInfo = (data: UserInterface.ADMIN): ActionResultInterface<UserInterface.ADMIN> => ({ type: INIT_ADMIN_INFO, payload: data })