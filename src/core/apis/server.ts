import axios, { AxiosResponse } from "axios";
import { store } from 'redux/store'
import { controlGlobalLoading } from 'redux/actionCreators/index'
import { ResultInterface } from "interfaces/index.interface";
import { message } from "antd";

// 接口前缀
const api_prefix = 'v1';
// 服务器地址
const baseURL = process.env.NODE_ENV === "production" ? "http://pumpkinduan.cn:3000/" : "http://127.0.0.1:5000/";

//进行全局的默认配置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000;
// 添加请求拦截器
// let reqCount = 0; //记录请求次数，处理并发请求
axios.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // reqCount++;
        store.dispatch(controlGlobalLoading({ status: 'start' }));
        return config;
    },
    function (error) {
        store.dispatch(controlGlobalLoading({ status: 'end' }));
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // reqCount--;
        // if (reqCount <= 0) {
        //     store.dispatch(controlGlobalLoading({ status: 'end' }));
        // }
        store.dispatch(controlGlobalLoading({ status: 'end' }));
        return response;
    },
    function (err) {
        // 对响应错误做点什么
        store.dispatch(controlGlobalLoading({ status: 'end' }));
        // reqCount--;
        // if (reqCount <= 0) { }
        const response = err.response as AxiosResponse<ResultInterface> | undefined

        if (response === undefined) {
            message.error('请求超时')
            return Promise.reject({});
        }

        if (Array.isArray(response.data.message)) {
            response.data.message.forEach((msg) => {
                message.error(msg);
            })
        } else {
            message.error(response.data.message);
        }

        return Promise.reject(response);
    }
);

//封装get和post请求
export default {
    baseURL,
    api_prefix,
    async get<Data = any>(path, params = {}): Promise<ResultInterface<Data>> {
        const response = await axios
            .get(api_prefix + path, {
                params
            })
        return response.data;
    },
    async post<Data = any>(path, data): Promise<ResultInterface<Data>> {
        const response = await axios.post(api_prefix + path, data);
        return response.data;
    },
    async put(path, data): Promise<ResultInterface> {
        const response = await axios.put(api_prefix + path, data);
        return response.data;
    },
    async delete(path, params = {}): Promise<ResultInterface> {
        const response = await axios
            .delete(api_prefix + path, {
                params
            });
        return response.data;
    },
    all(promises) {
        return new Promise((resolve, reject) => {
            axios.all(promises).then(
                axios.spread(
                    function (...result) {
                        // 所有请求现在都执行完成
                        resolve(result);
                    }
                ),
                (err) => {
                    reject(err);
                }
            );
        });
    }
};