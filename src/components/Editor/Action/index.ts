// 动作类型
import { IRedirect } from '@/components/Editor/Action/redirect';
import { IAlert } from '@/components/Editor/Action/alert';
import { IRequest } from '@/components/Editor/Action/request';

export type ActionType = 'redirect' | 'alert' | 'request' | 'toast';

// 动作参数
export type ActionProps = IRedirect & IAlert & IRequest;

export const ActionList: { name: string; value: ActionType }[] = [
  { name: '链接跳转', value: 'redirect' },
  { name: '浏览器弹窗', value: 'alert' },
  { name: '请求数据源', value: 'request' },
  { name: '轻提示', value: 'toast' },
];
