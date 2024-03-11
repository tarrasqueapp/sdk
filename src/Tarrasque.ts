import Emittery, { UnsubscribeFunction } from 'emittery';

import { logger } from './logger';

type EventName = string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventData = any;
type EventListener = (data: EventData) => void | Promise<void>;

export interface TarrasqueConfig {
  // Whether the SDK is running in an app or a plugin
  mode?: 'app' | 'plugin';
}

export class Tarrasque {
  // Configuration options for Tarrasque SDK
  private config: TarrasqueConfig;

  // Internal Emittery instance for managing event listeners and emitting events locally
  private emitter: Emittery;

  /**
   * Create a new Tarrasque SDK instance
   * @param config - Configuration options for the SDK
   */
  constructor(config: TarrasqueConfig = { mode: 'plugin' }) {
    this.config = config;
    this.emitter = new Emittery();

    // Listen for messages from the parent window
    if (this.config.mode === 'plugin') {
      window.addEventListener('message', this.handleMessage);
    }
  }

  /**
   * Clean up resources by removing the message event listener and clearing internal listeners.
   */
  destroy() {
    this.emitter.clearListeners();

    // Stop listening for messages from the parent window
    if (this.config.mode === 'plugin') {
      window.removeEventListener('message', this.handleMessage);
    }
  }

  /**
   * Handle incoming messages from the parent window
   * @param event - The message event containing data about the received message
   */
  private handleMessage(event: MessageEvent): void {
    const message = event.data;
    logger.debug('📥 Received event', message.event);

    // Emit the message to the local listeners
    this.emitter.emit(message.event, message.data);
  }

  /**
   * Get a list of all iframes on the page
   * @returns An array of all iframes on the page
   */
  private get iframes(): HTMLIFrameElement[] {
    return Array.from(document.querySelectorAll('iframe'));
  }

  /**
   * Listen for an event and run a callback when it is received
   * @param event - The event to listen for
   * @param listener - The callback to run when the event is received
   * @example
   * ```ts
   * tarrasque.on('campaign-changed', (data) => {
   *   console.log(data);
   * });
   * ```
   */
  public on(event: EventName, listener: EventListener): UnsubscribeFunction {
    return this.emitter.on(event, listener);
  }

  /**
   * Stop listening for an event with a specific callback
   * @param event - The event to stop listening for
   * @param callback - The callback to stop running when the event is received
   * @example
   * ```ts
   * const callback = (data) => {
   *   console.log(data);
   * };
   * tarrasque.on('campaign-changed', callback);
   * tarrasque.off('campaign-changed', callback);
   * ```
   */
  public off(event: EventName, listener: EventListener): void {
    this.emitter.off(event, listener);
  }

  /**
   * Listen for an event and run a callback only once when it is received
   * @param event - The event to listen for
   * @param listener - The callback to run when the event is received
   * @example
   * ```ts
   * tarrasque.once('campaign-changed', (data) => {
   *   console.log(data);
   * });
   * ```
   */
  public once(event: EventName, listener: EventListener): void {
    this.emitter.once(event).then(listener);
  }

  /**
   * Emit an event to the local listeners and send the event to the parent window or child iframes depending on the mode
   * @param event - The event name to emit
   * @param data - Optional data to emit with the event
   * ```ts
   * tarrasque.emit('viewport-set-position', { x: 0, y: 0 });
   * ```
   */
  public emit(event: EventName, data?: EventData): void {
    logger.debug('📤 Sending message', event, data);

    // Emit the message to the local listeners
    this.emitter.emit(event, data);

    // Send the message to all iframes on the page
    if (this.config.mode === 'app') {
      this.iframes.forEach((iframe) => {
        iframe.contentWindow?.postMessage({ event, data }, '*');
      });
    }

    // Send the message to the parent window
    if (this.config.mode === 'plugin') {
      window.parent.postMessage({ event, data }, '*');
    }
  }

  /**
   * Send a message to get the value of an item depending on the mode
   * @param event - The event name to send
   * @returns A promise resolving to the response data
   * @example
   * ```ts
   * const campaign = await tarrasque.get('campaign');
   * ```
   */
  public async get(event: EventName): Promise<EventData> {
    return new Promise((resolve, reject) => {
      // Set a timeout to reject the promise if no response is received
      const timeout = setTimeout(() => {
        this.emitter.off(event, listener); // Clean up the listener on timeout
        reject(new Error('Timed out waiting for response'));
      }, 5000);

      // Create a listener to resolve the promise when the response is received
      const listener = (response: EventData) => {
        clearTimeout(timeout);
        this.emitter.off(event, listener); // Clean up the listener after receiving the response
        resolve(response);
      };

      // Emit the event to the local listener of the app to allow for a response
      if (this.config.mode === 'app') {
        this.emitter.emit(event);
      }

      // Send the message to the parent window and listen for a response
      if (this.config.mode === 'plugin') {
        window.parent.postMessage({ event }, '*');
      }

      // Listen for the response
      this.emitter.on(event, listener);
    });
  }
}
