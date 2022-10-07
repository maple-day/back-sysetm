import httpProxy from '../utils/request';
import {ResponseData} from "../dto";
import {RequestRypeEnum, ContentTypeEnum} from "../enums/httpEnum";

export const fetchData = () => {
    return httpProxy({
        url: './table.json',
        method: 'get'
    });
};


// /**
//  * 登录
//  * @param params
//  */
// export async function loginHttp<T extends Record<string, any>>(params: T | undefined) {
//
//     return await httpProxy<loginType>({
//         url: "http://localhost:8088/login"
//         , method: "post"
//         , data: params
//         , headers: {
//             'Content-Type': 'application/json;charset:utf-8'
//         }
//         , withCredentials: true
//     });
// }


export async function httpPost<T extends Record<string, any>>(params: T | undefined, uri: string): Promise<ResponseData<any>> {

    return await httpProxy<any>({
        url: uri
        , method: RequestRypeEnum.POST
        , data: params
        , headers: {
            'Content-Type': ContentTypeEnum.JSON
        }
        , withCredentials: true
    });
}

