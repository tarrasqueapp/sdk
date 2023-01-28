export enum SetupStep {
  DATABASE = 1,
  USER = 2,
  COMPLETED = 3,
}

export interface Setup {
  step: SetupStep;
  completed: boolean;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author?: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  // Avatar
  avatar?: Media;
  avatarId?: string;
  // Order of campaigns
  campaignOrder: string[];
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Plugins
  plugins: Plugin[];
}

export interface CampaignInvite {
  id: string;
  email: string;
  // DateTime
  createdAt: string;
  // User
  user?: User;
  userId?: string;
  // Campaign
  campaign?: Campaign;
  campaignId: string;
}

export interface Campaign {
  id: string;
  name: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Created by
  createdBy?: User;
  createdById: string;
  // Members
  members: CampaignMember[];
  // Invites
  invites: CampaignInvite[];
}

export enum CampaignMemberRole {
  GAME_MASTER = 'GAME_MASTER',
  PLAYER = 'PLAYER',
}

export interface CampaignMember {
  id: string;
  role: CampaignMemberRole;
  // User
  user: User;
  userId: string;
  // Campaign
  campaignId: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
}

export interface Map {
  id: string;
  name: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
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
}

export interface Character {
  id: string;
  name: string;
  // Data
  data: Record<string, unknown>;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Media
  media?: Media[];
  mediaIds: string[];
  // Created by
  createdBy?: User;
  createdById: string;
  // Campaign
  campaign?: Campaign;
  campaignId: string;
  // Tokens
  tokens?: Token[];
  // Controlled by
  controlledBy?: User[];
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface File {
  id: string;
  name: string;
  type: string;
  extension: string;
  size: number;
  width?: number;
  height?: number;
}

export interface Media {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
  format: string;
  extension: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Created by
  createdBy: User;
  createdById: string;
}

export interface Token {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // User
  createdBy: User;
  createdById: string;
  // Map
  map: Map;
  mapId: string;
  // Character
  character?: Character;
  characterId?: string;
}
