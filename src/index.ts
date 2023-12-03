import { EventEmitter } from './EventEmitter';
import { EmitterCallback, Emitters, GetterCallback, Getters, ListenerCallback, Listeners } from './events';

export * from './types';

const eventEmitter = new EventEmitter();

export const tarrasque = {
  /**
   * Listen for an event from the parent window and run a callback when it is received
   * @param event - The event to listen for
   * @param callback - The callback to run when the event is received
   * @example
   * ```ts
   * tarrasque.on('CAMPAIGN_CHANGED', (data) => {
   *  console.log(data);
   * });
   * ```
   */
  on<T extends keyof Listeners>(event: T, callback: ListenerCallback<T>) {
    eventEmitter.on(`TARRASQUE_${event}`, callback);
  },

  /**
   * Stop listening for an event from the parent window
   * @param event - The event to stop listening for
   * @param callback - The callback to stop running when the event is received
   * @example
   * ```ts
   * const callback = (data) => {
   *  console.log(data);
   * };
   * tarrasque.on('CAMPAIGN_CHANGED', callback);
   * tarrasque.off('CAMPAIGN_CHANGED', callback);
   * ```
   */
  off<T extends keyof Listeners>(event: T, callback: ListenerCallback<T>) {
    eventEmitter.off(`TARRASQUE_${event}`, callback);
  },

  /**
   * Emit an event to the parent window with optional data
   * @param event - The event to emit
   * @param data - The payload to emit with the event
   * @example
   * ```ts
   * tarrasque.emit('VIEWPORT_SET_POSITION', { x: 0, y: 0 });
   * ```
   */
  emit<T extends keyof Emitters>(event: T, data?: Parameters<EmitterCallback<T>>[0]) {
    eventEmitter.postMessage(`TARRASQUE_${event}`, data);
  },

  /**
   * Get a value from the parent window asynchronously
   * @param event - The event to send
   * @returns The response from the parent window
   * @example
   * ```ts
   * const campaign = await tarrasque.get('CAMPAIGN');
   * ```
   */
  get<T extends keyof Getters>(event: T): ReturnType<GetterCallback<T>> {
    return eventEmitter.postMessageAsync(`TARRASQUE_${event}`) as ReturnType<GetterCallback<T>>;
  },
};
