/**
 * 给组件绑定自定义事件
 */
import { ref, onMounted, inject } from 'vue';
import { EventType, IEvent, EventTypeKey } from '@/components/Editor/Event';
import { ActionFactory } from '@/components/Editor/Action/factory';
import { Action } from '@/components/Editor/Action/abstractAction';

export default (events?: IEvent[]) => {
  const root = ref();
  const datasource = inject('datasource');
  if (events) {
    // 构建所有事件池对象
    const eventsObj: EventTypeKey = {
      click: [],
      mouseenter: [],
      mouseleave: [],
      mounted: [],
    };
    // 遍历组件中的所有事件
    events.forEach((item) => {
      // 判断是否存在于所有事件池中
      const targetEvent = eventsObj[item.eventType];
      // 如果没有，在对应的事件类型中添加事件
      if (!targetEvent) {
        eventsObj[item.eventType] = [item];
      } else {
        eventsObj[item.eventType] = [...targetEvent, item];
      }
    });

    /**
     * 触发action
     * @param actions
     */
    const trigger = (actions: Action[]) => {
      // 执行action中的handle 触发事件
      actions.forEach((item) => item.handle());
    };

    onMounted(() => {
      // 遍历所有事件池，click:[...events],mouseenter:[...events],mouseleave:[...events]...
      for (const eventType in eventsObj) {
        // 取出当前事件类型下的所有events
        // 例如：click:[events1,events2,events3,....]
        const currentEvents = eventsObj[eventType as EventType] as IEvent[];
        // 初始化当前事件下对应的action
        const handlePool: Action[] = [];
        // 如果有这个事件类型绑定了事件
        if (currentEvents.length > 0) {
          // 遍历事件，通过ActionFactory.getAction工厂函数，根据事件中的actionType，actionProps实例化一个Action
          currentEvents.forEach((item) => {
            // 实例化Action，添加到handlePool中。 [Action,Action,Action,.....]
            handlePool.push(ActionFactory.getAction(item, datasource));
          });

          // 开始绑定事件

          // 如果是初始化事件
          if ((eventType as EventType) === 'mounted') {
            trigger(handlePool);
          } else {
            // 其他类型事件，均通过ref绑定在dom元素上
            (root.value as HTMLElement).addEventListener(eventType, (e) => {
              // 阻止事件冒泡
              e.stopPropagation()
              trigger(handlePool);
            });
          }
        }
      }
    });
  }
  return {
    root,
  };
};
