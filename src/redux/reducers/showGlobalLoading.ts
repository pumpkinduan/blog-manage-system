import { SHOWLOADING } from '../actionTypes/index'
export const showGlobalLoading = (state = { loadingStatus: false }, action) => {
    switch (action.type) {
        case SHOWLOADING:
            return {...state, loadingStatus: action.loadingStatus };
        default:
            return state
    }
}