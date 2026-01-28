import { Socket } from 'socket.io-client';
import { EventEmitter } from 'events';

/**
 * Notification Types Enum
 */
export enum NotificationType {
  LIKE = 'like',
  COMMENT = 'comment',
  EVENT_RSVP = 'event_rsvp',
  MESSAGE = 'message',
  FOLLOW = 'follow',
  STORY_VIEW = 'story_view'
}

/**
 * Notification Interface
 */
export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  sourceUserId: string;
  sourceUserName: string;
  sourceUserAvatar?: string;
  contentId?: string;
  contentTitle?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

/**
 * Badge Count Interface
 */
export interface BadgeCount {
  total: number;
  byType: {
    [key in NotificationType]?: number;
  };
}
