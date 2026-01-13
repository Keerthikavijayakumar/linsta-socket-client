# Socket.IO Client Setup Guide for Linsta

## Download the Complete Project

You have two options to get the socket client code:

### Option 1: Download ZIP from GitHub
1. Go to https://github.com/Keerthikavijayakumar/linsta-socket-client
2. Click the green "Code" button
3. Click "Download ZIP"
4. Extract the zip file to your project directory

### Option 2: Clone the Repository
```bash
git clone https://github.com/Keerthikavijayakumar/linsta-socket-client.git
cd linsta-socket-client
```

## Installation Steps

### 1. Copy Files to Your Project

Copy the `src` folder from the downloaded package to your React Native project:

```bash
cp -r src/* your-project/src/
```

### 2. Install Dependencies

```bash
npm install socket.io-client
# or
yarn add socket.io-client
```

### 3. File Structure

Your project structure should look like:

```
your-project/
├── src/
│   ├── services/
│   │   └── socket.service.ts
│   ├── context/
│   │   ├── ChatContext.tsx
│   │   └── NotificationContext.tsx
│   ├── screens/
│   │   └── ChatRoomScreen.tsx
│   ├── components/
│   │   └── NotificationBadge.tsx
│   ├── App.tsx
│   └── index.ts
└── package.json
```

## Complete Source Code Files

### 1. src/services/socket.service.ts

[Socket service code is available in the repository]

### 2. src/context/ChatContext.tsx

[Chat context code]

### 3. src/context/NotificationContext.tsx

[Notification context code]

### 4. src/screens/ChatRoomScreen.tsx

[Chat room screen code]

### 5. src/components/NotificationBadge.tsx

[Notification badge code]

### 6. src/App.tsx

[App integration code]

## Configuration

### Update Server URL

Edit `src/services/socket.service.ts`:

```typescript
const API_BASE_URL = 'http://your-server-ip:5000';
```

Change based on your backend server:
- Development: `http://localhost:5000`
- Production: `https://your-api.com`

## Integration Steps

### 1. Wrap Your App with Providers

In your `App.tsx`:

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

### 2. Use Chat Context in Your Screens

```tsx
import { useChatContext } from '../context/ChatContext';

function YourChatScreen() {
  const { messages, sendMessage, joinRoom } = useChatContext();
  
  // Use the context
}
```

### 3. Use Notifications

```tsx
import { useNotificationContext } from '../context/NotificationContext';

function NotificationScreen() {
  const { notifications, unreadCount } = useNotificationContext();
  
  // Display notifications
}
```

## Testing the Connection

1. Ensure your Linsta backend is running on port 5000
2. Run your React Native app
3. Check console for "Connected to server" message
4. Try sending a message to verify the socket connection

## Troubleshooting

### Connection Failed
- Check if backend server is running
- Verify the server URL in socket.service.ts
- Check CORS configuration on backend
- Ensure JWT token is valid

### Messages Not Appearing
- Verify socket connection is established
- Check if user is member of the chat room
- Ensure message text is not empty
- Check backend logs for errors

### TypeScript Errors
- Install type definitions: `npm install --save-dev @types/react @types/react-native`
- Ensure TypeScript version is ^5.0.0

## Next Steps

1. Customize the UI components to match your design
2. Add error handling and user feedback
3. Implement message persistence
4. Add typing indicators
5. Implement read receipts

## API Reference

See README.md for detailed API documentation.
