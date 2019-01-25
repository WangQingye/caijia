import a from '../../main';
import {
    Loading
} from 'element-ui';
export default async (url = '', data = {}, type = 'GET', backend = '', method = 'fetch') => {
    type = type.toUpperCase();
    url = backend == 'user' ? userUrl + url : productUrl + url;
    if (type == 'GET') {
        let dataStr = ''; // 准备拼接请求字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&')) // 将最后多的一个&去掉
            url += '?' + dataStr;
        }
    }

    if (window.fetch && method == 'fetch') {
        let requestConfig = {
            credentials: 'include', // 传Cookie给服务器用以维护登录状态
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-cache'
        }

        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                // value: 'account=admin&pass=123456'
                value: JSON.stringify(data)
                // value: data
            })
        }
        try {
            let loading = Loading.service({
                fullscreen: false
            });
            let timer = setTimeout(() => {
                loading.close();
                a.$message({
                    message: '连接超时',
                    type: "error"
                });
            }, 10000)
            const response = await fetch(url, requestConfig);
            const responseData = await response.json();
            clearTimeout(timer);
            loading.close();
            if (responseData.code !== 0 && responseData.code !== 301) {
                console.log('请求错误', responseData);
                a.$message({
                    message: responseData.msg || '系统错误，请稍后再试',
                    type: "error"
                });
                // return false;
            }
            return responseData;
        } catch (err) {
            throw new Error(err)
        }
    } else {
        return new Promise((resolve, reject) => {
            let requestObj;
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest();
            } else {
                if (ActiveXObject) requestObj = new ActiveXObject;
            }

            let sendData = '';
            if (type == 'POST') {
                sendData = JSON.stringify(data)
            }
            requestObj.open(type, url, true);
            requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            requestObj.send(sendData);
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj);
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }
}