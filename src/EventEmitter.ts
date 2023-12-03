import mitt from 'mitt';

const emitter = mitt();

export class EventEmitter {
  /**
   * Create a new event emitter, listening for events from the parent window
   */
  constructor() {
    window.addEventListener('message', this.handleMessage);
  }

  /**
   * Destroy the event emitter
   */
  destroy() {
    window.removeEventListener('message', this.handleMessage);
    emitter.all.clear();
  }

  /**
   * When a message is received from the parent window, emit it to the listeners
   * @param event - The event from the parent window
   */
  private handleMessage(event: MessageEvent) {
    const message = event.data;
    console.debug('⬇️ Received event', message.event);
    emitter.emit(message.event, message.data);
  }

  /**
   * Send a message to the parent window
   * @param event - The event to send
   * @param data - The data to send with the event
   */
  public postMessage(event: string, data?: unknown): void {
    console.debug('⬆️ Sending message', event);

    // Emit the message to the local listeners
    emitter.emit(event, data);

    // Send the message to the parent window
    window.parent.postMessage({ event, data }, '*');
  }

  /**
   * Send a message to the parent window and await a response
   * @param event - The event to send
   * @param data - The data to send with the event
   * @returns The response from the parent window
   * @throws If the parent window does not respond within 5 seconds
   * @throws If the parent window responds with an error
   */
  public async postMessageAsync<T>(event: string, data?: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.off(event, handler); // Clean up the handler on timeout
        reject(new Error('Timed out waiting for response from parent window'));
      }, 5000);

      const handler = (response: T) => {
        clearTimeout(timeout);
        this.off(event, handler); // Clean up the handler after receiving the response
        resolve(response);
      };

      this.on(event, handler);
      this.postMessage(event, data); // Use postMessage to send the event
    });
  }

  /**
   * Listen for an event from the parent window
   * @param event - The event to listen for
   * @param handler - The handler to call when the event is emitted
   */
  public on<T>(event: string, handler: (data: T) => void): void {
    emitter.on(event, handler);
  }

  /**
   * Stop listening for an event from the parent window
   * @param event - The event to stop listening for
   * @param handler - The handler to stop calling when the event is emitted
   */
  public off<T>(event: string, handler: (data: T) => void): void {
    emitter.off(event, handler);
  }

  /**
   * Emit an event to the parent window
   * @param event - The event to emit
   * @param data - The data to emit with the event
   */
  public emit(event: string, data: unknown): void {
    console.debug('🔌 Emitting event', event);
    emitter.emit(event, data);
  }
}
