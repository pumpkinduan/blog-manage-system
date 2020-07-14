import { SHOWLOADING, HIDDENLOADING } from '../actionTypes/index'
export const handleLoading = (state = { loadingStatus: false }, action) => {
    switch (action.type) {
        case SHOWLOADING:
            return { loadingStatus: true, ...state };
        case HIDDENLOADING:
            return { loadingStatus: false, ...state };
        default:
            return state
    }
}