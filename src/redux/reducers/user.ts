import { UserInterface } from 'interfaces/index.interface';
import { INIT_ADMIN_INFO, ActionResultInterface } from 'redux/actionTypes';

const initialState: UserInterface.ADMIN = {
    type: UserInterface.USER_TYPE.ADMIN,
    username: 'Pumpkin',
    email: 'duanzz@ursalink.com',
    profiles: {
        nickname: '伊内个南瓜瓜',
        github: '',
        brief: '',
        notice: ''
    }

}

export const initAdminInfo = (state = initialState, action: ActionResultInterface<UserInterface.ADMIN>): UserInterface.ADMIN => {
    switch (action.type) {
        case INIT_ADMIN_INFO:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
