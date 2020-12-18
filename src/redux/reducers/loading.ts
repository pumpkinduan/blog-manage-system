import { CONTROL_LOADING, ActionResultInterface } from '../actionTypes/index';

export enum Global_Loading_Status {
    loading = 'start',
    finished = 'end'
}
export interface LoadingStateInterface {
    status: 'start' | 'end'
}
const initialState: LoadingStateInterface = {
    status: Global_Loading_Status.finished
}
export const controlGlobalLoading = (state = initialState, action: ActionResultInterface<LoadingStateInterface>): LoadingStateInterface => {
    switch (action.type) {
        case CONTROL_LOADING:
            return { ...state, ...action.payload };
        default:
            return state
    }
}