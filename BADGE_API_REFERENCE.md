# NotificationBadgeService API Reference

## Class: NotificationBadgeService

Manages real-time notification badge counts with event emission support.

### Constructor

```typescript
const service = new NotificationBadgeService();
```

### Methods

#### `initialize(socket: Socket): void`

Initializes the service with a Socket.IO client connection.

**Parameters:**
- `socket` (Socket.IO): Active socket connection

**Example:**
```typescript
const socket = getSocket();
service.initialize(socket);
```

#### `getBadgeCount(type: NotificationType | string): number`

Retrieves the badge count for a specific notification type.

**Parameters:**
- `type` (NotificationType | string): Notification type

**Returns:** Badge count (number)

**Example:**
```typescript
const count = service.getBadgeCount('message');
console.log(count); // e.g., 5
```

#### `getTotalBadgeCount(): number`

Gets the total count across all notification types.

**Returns:** Total count (number)

**Example:**
```typescript
const total = service.getTotalBadgeCount();
```

#### `onBadgeUpdate(callback: (type: string, count: number) => void): void`

Registers a listener for badge count changes.

**Parameters:**
- `callback` (function): Called when badge updates with type and count

**Example:**
```typescript
service.onBadgeUpdate((type, count) => {
  console.log(`${type} badge updated to ${count}`);
});
```

#### `setBadgeCount(type: NotificationType | string, count: number): void`

Manually sets the badge count for a notification type.

**Parameters:**
- `type` (NotificationType | string): Notification type
- `count` (number): New count value

**Example:**
```typescript
service.setBadgeCount('message', 10);
```

#### `incrementBadgeCount(type: NotificationType | string): void`

Increases the badge count by 1.

**Parameters:**
- `type` (NotificationType | string): Notification type

**Example:**
```typescript
service.incrementBadgeCount('message');
```

#### `decrementBadgeCount(type: NotificationType | string): void`

Decreases the badge count by 1 (minimum 0).

**Parameters:**
- `type` (NotificationType | string): Notification type

**Example:**
```typescript
service.decrementBadgeCount('message');
```

#### `resetBadge(type: NotificationType | string): void`

Resets badge count for specific type to 0.

**Parameters:**
- `type` (NotificationType | string): Notification type

**Example:**
```typescript
service.resetBadge('message');
```

#### `resetAllBadges(): void`

Resets all badge counts to 0.

**Example:**
```typescript
service.resetAllBadges();
```

#### `cleanup(): void`

Cleans up listeners and resources. Call on component unmount.

**Example:**
```typescript
componentWillUnmount() {
  service.cleanup();
}
```

## Types

### NotificationType (Enum)

```typescript
enum NotificationType {
  LIKE = 'like',
  COMMENT = 'comment',
  EVENT_RSVP = 'event_rsvp',
  MESSAGE = 'message',
  FOLLOW = 'follow',
  STORY_VIEW = 'story_view'
}
```

### Notification Interface

```typescript
interface Notification {
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
```

### BadgeCount Interface

```typescript
interface BadgeCount {
  total: number;
  byType: {
    [key in NotificationType]?: number;
  };
}
```

## Events

The service emits the following events:

### 'badgeUpdate'
Emitted when a single badge count changes.

### 'badgeReset'
Emitted when a badge is reset.

### 'allBadgesReset'
Emitted when all badges are reset.
