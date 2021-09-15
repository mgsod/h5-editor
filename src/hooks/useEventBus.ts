export enum EventType {
  updateBorder,
}
type handle = (payload: any) => void;
interface IEventPool {
  [key: string]: handle[];
}

class EventBus {
  private readonly pool: IEventPool;
  constructor() {
    this.pool = {};
  }
  $on(name: EventType, handle: handle) {
    this.pool[name] = this.pool[name] || [];
    (this.pool[name] as handle[]).push(handle);
  }
  $emit(name: EventType, payload?: any) {
    if (this.pool[name]) {
      this.pool[name].forEach((item) => {
        item(payload);
      });
    }
  }
  $off(name: EventType) {
    if (this.pool[name]) {
      delete this.pool[name];
    }
  }
}

const eventBus = new EventBus();

export default eventBus;
