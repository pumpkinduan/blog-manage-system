import { SHOWLOADING, HIDDENLOADING } from '../actionTypes/index'

export const showLoading = loadingStatus => ({ type: SHOWLOADING, loadingStatus })

export const hiddenLoading = loadingStatus => ({ type: HIDDENLOADING, loadingStatus })