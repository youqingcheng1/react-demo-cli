import axios from 'axios';
import {queryURLParam} from './utils';
import storage from './storage';
import { message } from 'antd';
import Qs from 'qs';

console.log(storage.getItem)
let hasMessge = 0;
const errorTip = (message,duration) => {
    if(!hasMessge){
        hasMessge = 1;
        message.error({
            content:message,
            duration,
        })
    }
}

/**
 * 状态响应吗
 * @param {Number} status 状态码
 * @param {String} content 内容
 */
const handleError = (status, content) => {
    switch(status){
        case 400:
            errorTip(`请求出错 - ${content}`, 2000);
            break;
            case 401:
            errorTip('登录失效，请重新登录', 2000);
            break;
            case 403:
            errorTip('您没有权限访问该接口', 2000);
            break;
            case 404:
            errorTip('请求出错，该接口不存在', 2000);
            break;
            case 405:
            errorTip(`请求出错 - ${content}`, 2000);
            break;
            default:
            errorTip(content, 2000);
            break;
    }
}

/**
 * 创建axios实例，设置20秒延时时间
 */
const ajax = axios.create({
    timeout: 1000*20
})

/**
 * 给post加请求头
 */
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

/**
 * 封装get请求
 */
export const createRequestFunc = (sourceMap,apiUrl) => {
    let result = {};
    for(let key in sourceMap){
        if(sourceMap.hasOwnProperty(key)){
            result[key] = async (body)=>{
                let data = {};
                if(body){
                    data = body
                } else {
                    data = {};
                }
                let method = sourceMap[key].method.toLowerCase();
                let path = sourceMap[key].path;
                let params = data;
                let response;
                if(method=='get'){
                    response = await ajax[method](`${apiUrl}${path}?${Qs.stringify(params)}`)
                } else {
                    response = await ajax[method](`${apiUrl}${path}`, {params})
                }

                if(response.status === 200) {
                    if(response.data.code === 0){
                        return Promise.resolve(response)
                    } else {
                        if(response.data.code < 500){
                            handleError(response.status, response.statusText);
                        } else {
                            errorTip(response.statusText, 2000)
                        }
                        return Promise.reject(response);
                    }
                }
            }
        }
    }
    return result;
}
/**
 * 请求拦截器
 */
ajax.interceptors.request.use(
    config=>{
        //请求头添加auth token
        const AUTH_TOKEN = storage.getItem('session','AUTH_TOKEN');

        AUTH_TOKEN && (config.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`);
            //请求头添加用户校验信息
        let newObj = {
            uid: queryURLParam('uin'),
            apiid: queryURLParam('apiid'),
            lang:queryURLParam('lang'),
            country:queryURLParam('country'),
            auth:queryURLParam('auth'),
            s2t:queryURLParam('s2t'),
            time:queryURLParam('time'),
            _time: new Date().getTime()
        }
        config.params = newObj;

        return config;
    },
    error=>Promise.reject(error)
)