# Badge Implementation Guide

## Overview
This guide provides comprehensive instructions for implementing and integrating the notification badge service in the Linsta Socket.IO client.

## Installation

```bash
npm install socket.io-client events
```

## Service Integration

The NotificationBadgeService is located in `src/services/notificationBadge.service.ts` and provides:

- Real-time badge count management
- Type-safe notification handling
- Event emission for reactive updates
- Memory-efficient state management

## Usage

### Basic Setup

```typescript
import { NotificationBadgeService } from './services/notificationBadge.service';

const badgeService = new NotificationBadgeService();
```

### Initialize with Socket

```typescript
import { getSocket } from './services/socket.service';

const socket = getSocket();
badgeService.initialize(socket);
```

## Event Handling

Listen to badge updates:

```typescript
badgeService.onBadgeUpdate((type, count) => {
  console.log(`Badge ${type} updated to ${count}`);
});
```

## API Methods

- `initialize(socket)` - Initialize service with socket connection
- `getBadgeCount(type)` - Get badge count for specific type
- `getTotalBadgeCount()` - Get total badge count
- `onBadgeUpdate(callback)` - Listen to badge changes

## Best Practices

1. Initialize service after socket connection is established
2. Always cleanup listeners on component unmount
3. Use proper TypeScript types for notification handling
4. Implement error handling for socket disconnections

## Troubleshooting

If badges are not updating:
- Verify socket connection is active
- Check server is emitting badge update events
- Ensure proper event listener cleanup
