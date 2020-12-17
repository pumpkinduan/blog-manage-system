import { UserInterface } from "interfaces/index.interface";

export const SHOWLOADING = 'SHOWLOADING';

export const APPEND_USER_INFO = 'APPEND_USER_INFO';
export interface AppendUserInfoAction {
    type: typeof APPEND_USER_INFO
    payload: UserInterface.ADMIN
}