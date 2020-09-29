
// ======= validate-xx 适用于antd的form表单的相关验证信息 ======
export interface validatorResultProps {
    status: boolean;
    msg: string;
    email?: boolean;
    phoneNumber?: boolean;
}

// 密码验证信息
export const validatePwd = (value: string): validatorResultProps => {
    const number_reg = /[0-9]+/g,
        lower_reg = /[a-z]+/g,
        upper_reg = /[A-Z]+/g;
    if (!value)
        return {
            status: false,
            msg: '请输入您的密码',
        };
    if (!number_reg.test(value))
        return {
            status: false,
            msg: '密码必须包含数字',
        };
    if (!lower_reg.test(value))
        return {
            status: false,
            msg: '密码必须包含小写字母',
        };
    if (!upper_reg.test(value))
        return {
            status: false,
            msg: '密码必须包含大写字母',
        };
    if (value.length < 8 || value.length > 63)
        return {
            status: false,
            msg: '密码长度不得小于8位',
        };
    return {
        status: true,
        msg: '',
    };
};



// 不能输入特殊字符 &\"$'`| <>
export const validateName = (value: string): validatorResultProps => {
    const name_reg = /[&\\"$'<>`|]/;
    if (name_reg.test(value)) {
        return {
            status: false,
            msg: "不能输入特殊字符 &\"$'`| <>",
        };
    }
    return {
        status: true,
        msg: '',
    };
}

