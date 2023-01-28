import { Character } from './types';

// The event names that the Tarrasque SDK can emit and listen for
export enum TarrasqueEvent {
  // General
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  // Characters
  CREATE_CHARACTER = 'create-character',
  UPDATE_CHARACTER = 'update-character',
  DELETE_CHARACTER = 'delete-character',
  CREATED_CHARACTER = 'created-character',
  UPDATED_CHARACTER = 'updated-character',
  DELETED_CHARACTER = 'deleted-character',
}

// The events that the Tarrasque SDK can listen for
export interface TarrasqueListenEvents {
  // General
  [TarrasqueEvent.CONNECT]: () => void;
  [TarrasqueEvent.DISCONNECT]: () => void;
  // Characters
  [TarrasqueEvent.CREATED_CHARACTER]: (data: Character) => void;
  [TarrasqueEvent.UPDATED_CHARACTER]: (data: Character) => void;
  [TarrasqueEvent.DELETED_CHARACTER]: (data: Character) => void;
}

// The events that the Tarrasque SDK can emit
export interface TarrasqueEmitEvents {
  // Characters
  [TarrasqueEvent.CREATE_CHARACTER]: (data: Character) => void;
  [TarrasqueEvent.UPDATE_CHARACTER]: (data: Character) => void;
  [TarrasqueEvent.DELETE_CHARACTER]: (data: Character) => void;
}
