
export type Specialty = 'Digital' | 'Industrie' | 'Tourisme' | 'Santé' | 'BTP' | 'Agriculture';

export interface User {
  id: string;
  name: string;
  specialty: Specialty;
  year: 1 | 2;
  bio: string;
  avatar: string;
  skills: string[];
  points: number;
  level: 'Beginner' | 'Contributor' | 'Elite Member';
  badges: string[];
  friends?: string[]; // Array of user IDs
  friendRequests?: FriendRequest[];
}

export interface FriendRequest {
  id: string;
  fromId: string;
  fromName: string;
  fromAvatar: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  type: 'general' | 'question' | 'advice';
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  timestamp: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'urgent' | 'normal' | 'event';
  filiere: Specialty | 'All';
  date: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'Trip' | 'Sport' | 'Workshop' | 'Meetup';
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  isJoined: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  specialty: Specialty;
  fileType: string;
  sharedBy: string;
  downloads: number;
}

export interface LiveEvent {
  id: string;
  title: string;
  host: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

export interface ChatThread {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  unread: boolean;
}

export type CallType = 'video' | 'audio' | 'random' | 'group' | 'none';
export type CallState = 'idle' | 'searching' | 'connecting' | 'connected' | 'ringing';

export enum Language {
  AR = 'ar',
  FR = 'fr',
  EN = 'en'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
