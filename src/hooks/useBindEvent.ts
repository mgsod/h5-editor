/**
 * 给组件绑定自定义事件
 */
import { ref, onMounted } from "vue";
import { EventType, IEvent } from "@/components/Editor/event";
import { ActionFactory } from "@/components/Editor/action/factory";
import { Action } from "@/components/Editor/action/abstractAction";

type EventTypeKey = Record<EventType, IEvent[]>;
export default (events?: IEvent[]) => {
  const root = ref();
  if (events) {
    const eventsObj: EventTypeKey = {
      click: [],
      mouseenter: [],
      mouseleave: [],
    };
    events.forEach((item) => {
      const targetEvent = eventsObj[item.eventType];
      if (!targetEvent) {
        eventsObj[item.eventType] = [item];
      } else {
        eventsObj[item.eventType] = [...targetEvent, item];
      }
    });

    onMounted(() => {
      // 遍历事件类型
      for (const eventType in eventsObj) {
        // 取出当前事件类型下的所有handle
        const currentEvents = eventsObj[eventType as EventType] as IEvent[];
        const eventHandlePool: Action[] = [];
        if (currentEvents.length > 0) {
          // 实例化事件，添加到事件池
          currentEvents.forEach((item) => {
            eventHandlePool.push(ActionFactory.getAction(item));
          });
          // 给当前组件绑定eventType,执行事件池的所有动作
          (root.value as HTMLElement).addEventListener(eventType, () => {
            eventHandlePool.forEach((item) => {
              item.handle();
            });
          });
        }
      }
    });
  }
  return {
    root,
  };
};
