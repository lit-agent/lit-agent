/**
 * 访问外部接口返回结果包装类
 */
export class Result<T> {
    // 请求是否成功
    success: boolean;
    // 请求返回数据
    data: T;

    constructor(success: boolean, data: T) {
        this.success = success;
        this.data = data;
    }
}