export type User = {
  id: string;
  name: string;
  displayName: string;
  email: string;
  // Avatar
  avatar?: Media;
  avatarId?: string;
};

export type Campaign = {
  id: string;
  name: string;
  // Memberships
  memberships: Membership[];
  // Created by
  createdBy: User;
  createdById: string;
  // Maps
  maps: Map[];
};

export enum Role {
  GAME_MASTER = 'GAME_MASTER',
  PLAYER = 'PLAYER',
}

export type Membership = {
  role: Role;
  color: string;
  // User
  user: User;
  userId: string;
  // Campaign
  campaignId: string;
};

export type Map = {
  id: string;
  name: string;
  // Media
  media: Media[];
  mediaIds: string[];
  selectedMediaId: string;
  // Campaign
  campaign: Campaign;
  campaignId: string;
  // Created by
  createdBy: User;
  createdById: string;
  // Tokens
  tokens?: Token[];
};

export type Character = {
  id: string;
  name: string;
  // Tokens
  tokens?: Token[];
  // Media
  media?: Media[];
  selectedMediaId: string;
  // Created by
  createdBy?: User;
  createdById: string;
  // Controlled by
  controlledBy?: User[];
  // Campaign
  campaign?: Campaign;
  campaignId: string;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type PingLocation = {
  id?: string;
  position: Position;
  color: string;
  mapId: string;
  userId: string;
};

export type File = {
  id: string;
  name: string;
  type: string;
  extension: string;
  size: number;
  width?: number;
  height?: number;
};

export type Media = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
  format: string;
  extension: string;
  // Created by
  createdBy: User;
  createdById: string;
};

export type Token = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  // User
  createdBy: User;
  createdById: string;
  // Map
  map: Map;
  mapId: string;
  // Character
  character?: Character;
  characterId?: string;
};
