export interface exceptionResultInterface {
    statusCode: number,
    timestamp: number,
    time: string,
    path: string,
    error: string;
    message: string | string[];
}