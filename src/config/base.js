const baseUrlArry = ['ceshifu', 'zhengshifu'];

function comBaseUrl(baseUrlArry){
    return process.env.NODE_ENV === 'production'?
           process.env.VUE_APP_REALEASE === 'prod' ? baseUrlArry[1] : baseUrlArry[0]
           : '/api/v1/'
}

export const baseUrl = comBaseUrl(baseUrlArry);