import { EventEmitter } from './EventEmitter';
import {
  EmitEventCallback,
  EmitEventTypes,
  GetterEventCallback,
  GetterEventTypes,
  OnEventCallback,
  OnEventTypes,
} from './events';

export * from './types';

const eventEmitter = new EventEmitter();

export const tarrasque = {
  /**
   * Listen for an event from the parent window
   * @param event - The event to listen for
   * @param callback - The callback to run when the event is received
   * @example
   * ```ts
   * tarrasque.on('CAMPAIGN_CHANGED', (data) => {
   *  console.log(data);
   * });
   * ```
   */
  on<T extends keyof OnEventTypes>(event: T, callback: OnEventCallback<T>) {
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
  off<T extends keyof OnEventTypes>(event: T, callback: OnEventCallback<T>) {
    eventEmitter.off(`TARRASQUE_${event}`, callback);
  },

  /**
   * Emit an event to the parent window
   * @param event - The event to emit
   * @param data - The payload to emit with the event
   * @example
   * ```ts
   * tarrasque.emit('VIEWPORT_SET_POSITION', { x: 0, y: 0 });
   * ```
   */
  emit<T extends keyof EmitEventTypes>(event: T, data?: Parameters<EmitEventCallback<T>>[0]) {
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
  get<T extends keyof GetterEventTypes>(event: T): ReturnType<GetterEventCallback<T>> {
    return eventEmitter.postMessageAsync(`TARRASQUE_${event}`) as ReturnType<GetterEventCallback<T>>;
  },

  /**
   * Post a message to child windows (used internally by Tarrasque App)
   * @param event - The event to send
   * @param data - The payload to send with the event
   * @private
   * @example
   * ```ts
   * tarrasque._broadcast('CAMPAIGN_CHANGED', { id: '1234' });
   * ```
   */
  _broadcast<T extends keyof OnEventTypes>(event: T, data?: Parameters<OnEventCallback<T>>[0]) {
    // Get all iframes on the page
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach((iframe) => {
      // Send the message to the child window
      iframe.contentWindow?.postMessage({ event: `TARRASQUE_${event}`, data }, '*');
    });
  },

  /**
   * Listen for a message from child windows and respond (used internally by Tarrasque App)
   * @param callback - The callback to run when a message is received
   * @private
   * @example
   * ```ts
   * const unregisterListener = tarrasque._listen((event) => {
   *  const message = event.data;
   *  const eventHandlers = {
   *   CAMPAIGN: () => {
   *    return { id: '1234', ... };
   *   },
   *   VIEWPORT_GET_POSITION: () => {
   *    return { x: 0, y: 0 };
   *   },
   *  };
   *  return eventHandlers[message.event];
   * });
   * unregisterListener();
   */
  _listen(callback: (event: MessageEvent) => () => unknown): () => void {
    // Listen for messages from child windows
    const listener = (event: MessageEvent) => {
      const message = event.data;
      if (!message.event) return;

      // Run the callback to get the event handler
      const eventHandler = callback?.(message);
      if (!eventHandler) return;

      // Send the response back to the child window, with the resolved event handler
      const response = { event: message.event, data: eventHandler() };
      event.source?.postMessage(response, { targetOrigin: event.origin });
    };

    // Register the listener
    window.addEventListener('message', listener);

    // Return a function to unregister the listener
    return () => {
      window.removeEventListener('message', listener);
    };
  },
};
