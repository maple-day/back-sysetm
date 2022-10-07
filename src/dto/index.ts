/**
 * 接口返回类型
 */
export interface ResponseData<T = any> {
    code: number,
    msg: string,
    data: T
}

/**
 * 登录返回token
 */
export type loginToken = string;

export interface userInfo {
    address: string,
    phone: number
}