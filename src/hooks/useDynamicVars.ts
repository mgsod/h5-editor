import { reactive, inject } from 'vue';

export default () => {
  const store = reactive<{ [key: string]: any }>({
    name: 'Alice',
    age: 15,
  });
  const setItem = (key: string, value: any) => {
    store[key] = value;
  };
  const getItem = (key: string) => {
    return store[key];
  };
  const parseExpression = (expression?: string) => {
    const preview = !!inject('isPreview');
    if (!preview) return expression;
    return expression?.replaceAll(/{{(.*?)}}/g, ($1) => {
      const vars = $1.replaceAll('{', '').replaceAll('}', '').trim();
      return getItem(vars) || '';
    });
  };
  return {
    getItem,
    setItem,
    parseExpression,
    store,
  };
};
