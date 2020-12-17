import { UserInterface } from 'interfaces/index.interface';
import { AppendUserInfoAction, APPEND_USER_INFO } from 'redux/actionTypes';

const userInfoInitialState: UserInterface.ADMIN = {
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

export const appendUserInfo = (state: UserInterface.ADMIN = userInfoInitialState, action: AppendUserInfoAction) => {
    switch (action.type) {
        case APPEND_USER_INFO:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
