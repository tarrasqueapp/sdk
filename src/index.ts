import { EventEmitter } from './EventEmitter';
import { Campaign, Map, Position } from './types';

export * from './types';

const eventEmitter = new EventEmitter();

export const tarrasque = {
  onReady(callback: () => void) {
    eventEmitter.on('TARRASQUE_READY', callback);
  },
  campaign: {
    get() {
      return eventEmitter.postMessageAsync<Campaign>('TARRASQUE_CAMPAIGN_GET');
    },
    onChange(callback: (campaign: Campaign) => void) {
      eventEmitter.on('TARRASQUE_CAMPAIGN_CHANGED', callback);
    },
  },
  map: {
    get() {
      return eventEmitter.postMessageAsync<Map>('TARRASQUE_MAP_GET');
    },
    onChange(callback: (map: Map) => void) {
      eventEmitter.on('TARRASQUE_MAP_CHANGED', callback);
    },
  },
  viewport: {
    getPosition() {
      return eventEmitter.postMessageAsync<Position>('TARRASQUE_VIEWPORT_GET_POSITION');
    },
    setPosition(position: Position) {
      eventEmitter.postMessage('TARRASQUE_VIEWPORT_SET_POSITION', position);
    },
    getScale() {
      return eventEmitter.postMessageAsync<number>('TARRASQUE_VIEWPORT_GET_SCALE');
    },
    setScale(scale: number) {
      eventEmitter.postMessage('TARRASQUE_VIEWPORT_SET_SCALE', scale);
    },
    zoomIn() {
      eventEmitter.postMessage('TARRASQUE_VIEWPORT_ZOOM_IN');
    },
    zoomOut() {
      eventEmitter.postMessage('TARRASQUE_VIEWPORT_ZOOM_OUT');
    },
    zoomToFit() {
      eventEmitter.postMessage('TARRASQUE_VIEWPORT_ZOOM_TO_FIT');
    },
    onChange(callback: (data: { position: Position; scale: number }) => void) {
      eventEmitter.on('TARRASQUE_VIEWPORT_CHANGED', callback);
    },
  },
};
