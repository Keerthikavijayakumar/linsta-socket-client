# Linsta Socket.IO Client

Socket.IO Client for Linsta React Native App - Real-time chat and notifications

## Installation

```bash
npm install socket.io-client
# or
yarn add socket.io-client
```

## Project Structure

```
src/
├── services/
│   └── socket.service.ts       # Socket initialization & management
├── context/
│   ├── ChatContext.tsx         # Chat state & functions
│   └── NotificationContext.tsx # Notifications state
├── screens/
│   └── ChatRoomScreen.tsx      # Chat UI component
├── components/
│   └── NotificationBadge.tsx   # Notification indicator
└── App.tsx                      # Main app with providers
```

## Quick Start

### 1. Initialize Socket in App.tsx

```tsx
import { ChatProvider } from './context/ChatContext';
import { NotificationProvider } from './context/NotificationContext';

export default function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <ChatProvider token={authToken || ''}>
      <NotificationProvider>
        {/* Your app screens */}
      </NotificationProvider>
    </ChatProvider>
  );
}
```

### 2. Use Chat Context

```tsx
import { useChatContext } from './context/ChatContext';

function MyScreen() {
  const { sendMessage, joinRoom, messages } = useChatContext();

  useEffect(() => {
    joinRoom('chatRoomId');
  }, []);

  const handleSend = (text: string) => {
    sendMessage('chatRoomId', text);
  };

  return (
    // Your UI
  );
}
```

### 3. Use Notifications

```tsx
import { useNotificationContext } from './context/NotificationContext';

function NotificationScreen() {
  const { notifications, unreadCount } = useNotificationContext();

  return (
    <View>
      <Text>Unread: {unreadCount}</Text>
      <FlatList data={notifications} renderItem={...} />
    </View>
  );
}
```

## API Reference

### Socket Service

- `initializeSocket(token)` - Initialize socket with JWT token
- `getSocket()` - Get active socket instance
- `disconnectSocket()` - Disconnect socket

### Chat Context

- `joinRoom(chatRoomId)` - Join a chat room
- `sendMessage(chatRoomId, text)` - Send message
- `fetchMessageHistory(chatRoomId, limit)` - Load message history

### Notification Context

- `subscribeToNotifications()` - Subscribe to notifications
- `markAsRead(notificationId)` - Mark notification as read

## Socket Events

**Emit Events:**
- `join_room` - Join a chat room
- `send_message` - Send message
- `get_history` - Fetch message history
- `subscribe_notifications` - Subscribe to notifications

**Listen Events:**
- `receive_message` - Incoming message
- `message_history` - Message history response
- `notification` - Incoming notification

## Configuration

Update `src/services/socket.service.ts` to change server URL:

```typescript
const API_BASE_URL = 'http://localhost:5000'; // Change this
```

## Files Included

1. **socket.service.ts** - Socket connection management
2. **ChatContext.tsx** - Chat state management
3. **NotificationContext.tsx** - Notification state management
4. **ChatRoomScreen.tsx** - Chat UI example
5. **NotificationBadge.tsx** - Notification UI example
6. **App.tsx** - Integration example

## License

MIT
