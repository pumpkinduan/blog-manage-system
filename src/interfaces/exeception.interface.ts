export interface ExceptionResultInterface {
    statusCode: number,
    timestamp: number,
    time: string,
    path: string,
    error: string;
    message: string | string[];
}