import { Action } from '@/components/Editor/Action/abstractAction';
import axios, { Method, AxiosRequestConfig } from 'axios';
import { DATASOURCE } from '@/hooks/useDynamicVars';
import { Toast } from 'vant';
export interface IDataSourceItem {
  alias: string;
  method: Method;
  url: string;
  body: string;
  code: string;
  msg: string;
  data: string;
  headers: string;
}
export interface IDataSources {
  [key: string]: IDataSourceItem;
}

export interface IRequest {
  datasource: string;
}

export class Request extends Action implements IRequest {
  datasource: string;
  constructor(public props: IRequest, public dataSourceMap: IDataSources) {
    super();
    this.datasource = props.datasource;
    this.dataSourceMap = dataSourceMap;
  }
  async handle() {
    if (!this.dataSourceMap[this.datasource]) {
      console.warn(
        `请求数据源出错：未找到该数据源，请确认数据池中是否有${this.datasource}`
      );
      return;
    }
    const { url, msg, body, code, method, data, headers } =
      this.dataSourceMap[this.datasource];
    const options: AxiosRequestConfig = {
      url: url,
      method,
    };
    if (headers) {
      options.headers = JSON.parse(headers);
    }
    if (body && method !== 'get') {
      options.data = JSON.parse(body);
    }
    const { data: requestData, status, statusText } = await axios(options);
    if (status !== 200) {
      return Toast(statusText);
    }
    const { [code]: _code, [msg]: _message, [data]: _data } = requestData;
    if (_code === 200) {
      DATASOURCE[this.datasource] = _data;
    } else {
      Toast(_message);
    }
  }
}
