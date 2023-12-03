import { Campaign, Map, Position } from './types';

export type OnEventTypes<T = Record<string, (data: unknown) => void>> = {
  READY: () => void;
  CAMPAIGN_CHANGED: (campaign: Campaign) => void;
  MAP_CHANGED: (map: Map) => void;
  VIEWPORT_CHANGED: (data: { position: Position; scale: number }) => void;
} & T;

export type OnEventCallback<T extends keyof OnEventTypes> = OnEventTypes[T] extends (...args: infer U) => void
  ? (...args: U) => void
  : never;

export type GetterEventTypes<T = Record<string, () => Promise<unknown>>> = {
  CAMPAIGN: () => Promise<Campaign>;
  MAP: () => Promise<Map>;
  VIEWPORT_POSITION: () => Promise<Position>;
  VIEWPORT_SCALE: () => Promise<number>;
} & T;

export type GetterEventCallback<T extends keyof GetterEventTypes> = GetterEventTypes[T] extends () => Promise<infer U>
  ? () => Promise<U>
  : never;

export type EmitEventTypes<T = Record<string, (data?: unknown) => void>> = {
  VIEWPORT_SET_POSITION: (position: Position) => void;
  VIEWPORT_SET_SCALE: (scale: number) => void;
  VIEWPORT_ZOOM_IN: () => void;
  VIEWPORT_ZOOM_OUT: () => void;
  VIEWPORT_ZOOM_TO_FIT: () => void;
} & T;

export type EmitEventCallback<T extends keyof EmitEventTypes> = EmitEventTypes[T] extends (...args: infer U) => void
  ? (...args: U) => void
  : never;
