import axios, { Method, AxiosRequestConfig } from 'axios';
import { Toast } from 'vant';
export const DATASOURCE: { [key: string]: any } = {};
interface IDataSourceItem {
  alias: string;
  method: Method;
  url: string;
  body: string;
  code: string;
  msg: string;
  data: string;
}
const datasource: { [key: string]: IDataSourceItem } = {
  document: {
    alias: 'document',
    method: 'GET',
    url: 'http://127.0.0.1:3000/api/document',
    body: '',
    code: 'code',
    msg: 'message',
    data: 'data',
  },
};

export default () => {
  const request = async (target: string) => {
    const { url, msg, body, code, method, data } = datasource[target];
    const options: AxiosRequestConfig = {
      url: url,
      method,
    };
    if (body && method !== 'get') {
      options.data = body;
    }
    const { data: requestData, status, statusText } = await axios(options);
    if (status !== 200) {
      return Toast(statusText);
    }
    const { [code]: _code, [msg]: _message, [data]: _data } = requestData;
    if (_code === 200) {
      DATASOURCE[target] = _data;
    } else {
      Toast(_message);
    }
  };

  return {
    request,
    DATASOURCE,
  };
};
