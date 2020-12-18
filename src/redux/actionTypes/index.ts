export const CONTROL_LOADING = 'CONTROL_LOADING';

export const INIT_ADMIN_INFO = 'INIT_ADMIN_INFO';

// action的数据格式
export interface ActionResultInterface<D = any> {
    type: string;
    payload: D;
}