type EventMap = {
    message: string;
  };
  
  type EventHandler<T> = (data: T) => void;
  
  type Listeners = {
    [K in keyof EventMap]?: EventHandler<EventMap[K]>[];
  } & { [key: string]: ((data: any) => void)[] };
  
  const createEventBus = () => {
    const listeners: Listeners = {};
  
    const on = <K extends keyof EventMap>(event: K, callback: EventHandler<EventMap[K]>): void => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
  
      (listeners[event] as EventHandler<EventMap[K]>[]).push(callback);
      console.log(`Listener added for event: ${String(event)}`);
    };
  
    const off = <K extends keyof EventMap>(event: K, callback: EventHandler<EventMap[K]>): void => {
      if (!listeners[event]) {
        return;
      }
  
      listeners[event] = listeners[event]?.filter(
        (listener) => listener !== callback,
      ) as EventHandler<EventMap[K]>[];
      console.log(`Listener removed for event: ${String(event)}`);
    };
  
    const emit = <K extends keyof EventMap>(event: K, data: EventMap[K]): void => {
      if (!listeners[event]) {
        console.log(`No listeners for event: ${String(event)}`);
        return;
      }
      console.log(`Emitting event: ${String(event)} with data:`, data);
      [...(listeners[event] ?? [])].forEach((listener) => listener(data));
    };
  
    return {
      on,
      off,
      emit,
    };
  };
  
  const eventBus = createEventBus();
  
  export default eventBus;
  