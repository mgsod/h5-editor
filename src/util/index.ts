export default class Util {
  public static FastInitProps(source: any, target: any): void {
    if (source) {
      for (const prop in source) {
        target[prop] = source[prop];
      }
    }
  }
}
