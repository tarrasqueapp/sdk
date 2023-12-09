import { Campaign, Map, Position } from './types';

export type Listeners = {
  READY: () => void;
  CAMPAIGN_CHANGED: (campaign: Campaign) => void;
  MAP_CHANGED: (map: Map) => void;
  VIEWPORT_CHANGED: (data: { position: Position; scale: number }) => void;
};

export type ListenerCallback<T extends keyof Listeners> = Listeners[T] extends (...args: infer U) => void
  ? (...args: U) => void
  : never;

export type Getters = {
  CAMPAIGN: () => Promise<Campaign>;
  MAP: () => Promise<Map>;
  VIEWPORT_POSITION: () => Promise<Position>;
  VIEWPORT_SCALE: () => Promise<number>;
};

export type GetterCallback<T extends keyof Getters> = Getters[T] extends () => Promise<infer U>
  ? () => Promise<U>
  : never;

export type Emitters = {
  READY: () => void;
  VIEWPORT_SET_POSITION: (position: Position) => void;
  VIEWPORT_SET_SCALE: (scale: number) => void;
  VIEWPORT_ZOOM_IN: () => void;
  VIEWPORT_ZOOM_OUT: () => void;
  VIEWPORT_ZOOM_TO_FIT: () => void;
  PING_LOCATION: (position: Position) => void;
};

export type EmitterCallback<T extends keyof Emitters> = Emitters[T] extends (...args: infer U) => void
  ? (...args: U) => void
  : never;
