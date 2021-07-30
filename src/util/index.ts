export default class Util {
  public static FastInitProps<T>(source: T, target: T): void {
    if (source) {
      for (const prop in source) {
        target[prop] = source[prop];
      }
    }
  }
}
