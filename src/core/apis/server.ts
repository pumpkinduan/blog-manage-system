import axios from "axios";
import store from '../../redux/store'
import { showGlobalLoading } from '../../redux/actionCreators/index'
// import { Spin } from 'antd';
// import Loading from '../../components/Loading/index'
//进行全局的默认配置
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "http://pumpkinduan.cn:3000" : "/api";
axios.defaults.timeout = 10000;
// 添加请求拦截器
let reqCount = 0; //记录请求次数，处理并发请求
axios.interceptors.request.use(
    function (config) {
        reqCount++;
        store.dispatch(showGlobalLoading(true));
        return config;
    },
    function (error) {
        store.dispatch(showGlobalLoading(false));
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        reqCount--;
        if (reqCount <= 0) {
            store.dispatch(showGlobalLoading(false));
        }
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        store.dispatch(showGlobalLoading(false));
        reqCount--;
        if (reqCount <= 0) { }
        let resErr = error;
        if (error.response) {
            resErr = error.response.data;
        }
        if (error.message.includes("timeout")) {
        }
        return Promise.reject(resErr);
    }
);

//封装get和post请求
export default {
    get(path, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .get(path, {
                    params
                })
                .then(
                    response => {
                        resolve(response.data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    },
    post(path, data) {
        return new Promise((resolve, reject) => {
            axios.post(path, data).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            );
        });
    },
    put(path, data) {
        return new Promise((resolve, reject) => {
            axios.put(path, data).then(
                response => {
                    resolve(response);
                },
                error => {
                    reject(error);
                }
            );
        });
    },
    delete(path, params = {}) {
        return new Promise((resolve, reject) => {
            axios
                .delete(path, {
                    params
                })
                .then(
                    response => {
                        resolve(response.data);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
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