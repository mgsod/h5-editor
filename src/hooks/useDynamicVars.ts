import { reactive, inject } from 'vue';
import { DATASOURCE } from '@/hooks/useDataSource';
export default () => {
  const store = reactive<{ [key: string]: any }>(DATASOURCE);
  const setItem = (key: string, value: any) => {
    store[key] = value;
  };
  const getItem = (key: string[]) => {
    try {
      let root: any = DATASOURCE[key.splice(0, 1)[0]];
      const result: any = '';
      return key.reduce((re, current) => {
        re = root[current];
        root = re;
        return re;
      }, result);
    } catch (e) {
      return e.toString();
    }
  };
  const parseExpression = (expression?: string) => {
    const preview = !!inject('isPreview');
    if (!preview) return expression;
    if (!/\{\{.*?\}\}/.test(expression as string)) return expression;
    return expression?.replaceAll(/{{(.*?)}}/g, ($1) => {
      const vars = $1.replaceAll('{', '').replaceAll('}', '').trim();
      const tree = vars.match(/\w+/g);
      if (tree) {
        return getItem(tree) || '';
      }
      return '';
    });
  };
  return {
    getItem,
    setItem,
    parseExpression,
    store,
  };
};
