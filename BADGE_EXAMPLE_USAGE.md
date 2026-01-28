# Badge Service - Example Usage

## React Native Component Example

```typescript
import React, { useEffect, useState } from 'react';
import { Text, View, Badge } from 'react-native';
import { NotificationBadgeService } from '../services/notificationBadge.service';
import { getSocket } from '../services/socket.service';

export const NotificationBadgeComponent = () => {
  const [badgeCounts, setBadgeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const socket = getSocket();
    const badgeService = new NotificationBadgeService();

    badgeService.initialize(socket);

    badgeService.onBadgeUpdate((type, count) => {
      setBadgeCounts(prev => ({
        ...prev,
        [type]: count
      }));
    });

    return () => {
      badgeService.cleanup();
    };
  }, []);

  return (
    <View>
      {Object.entries(badgeCounts).map(([type, count]) => (
        <View key={type}>
          <Text>{type}: </Text>
          <Badge value={count} status="error" />
        </View>
      ))}
    </View>
  );
};
```

## Hook Example

```typescript
import { useEffect, useState, useCallback } from 'react';
import { NotificationBadgeService } from '../services/notificationBadge.service';
import { getSocket } from '../services/socket.service';

export const useBadges = () => {
  const [badges, setBadges] = useState<Record<string, number>>({});

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const badgeService = new NotificationBadgeService();
    badgeService.initialize(socket);

    badgeService.onBadgeUpdate((type, count) => {
      setBadges(prev => ({ ...prev, [type]: count }));
    });

    return () => badgeService.cleanup();
  }, []);

  return badges;
};

// Usage
const MyComponent = () => {
  const badges = useBadges();
  return <Text>Messages: {badges.message || 0}</Text>;
};
```

## Direct Service Usage

```typescript
const badgeService = new NotificationBadgeService();
const socket = getSocket();

badgeService.initialize(socket);

const messageCount = badgeService.getBadgeCount('message');
const totalCount = badgeService.getTotalBadgeCount();

console.log(`Messages: ${messageCount}, Total: ${totalCount}`);
```

## Socket Event Handling

The service listens to these events from the server:

```typescript
// Server emits
socket.emit('badge:update', { type: 'message', count: 5 });
socket.emit('badge:reset', { type: 'message' });
socket.emit('badge:reset-all');
```
