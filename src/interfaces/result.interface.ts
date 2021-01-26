// 定义通用的API接口返回数据类型
export interface ResultInterface<D = any> {
    statusCode: number;
    message?: string;
    success: boolean;
    data: D;
    sum: number
}