# Badge Service Testing Guide

## Unit Testing

### Testing Badge Count Methods

```typescript
describe('NotificationBadgeService', () => {
  let service: NotificationBadgeService;
  let socket: Socket;

  beforeEach(() => {
    service = new NotificationBadgeService();
    socket = io('http://localhost:5000');
    service.initialize(socket);
  });

  afterEach(() => {
    service.cleanup();
  });

  describe('getBadgeCount', () => {
    it('should return 0 for new badge type', () => {
      expect(service.getBadgeCount('message')).toBe(0);
    });

    it('should return correct count after setting', () => {
      service.setBadgeCount('message', 5);
      expect(service.getBadgeCount('message')).toBe(5);
    });
  });

  describe('incrementBadgeCount', () => {
    it('should increment badge count', () => {
      service.incrementBadgeCount('message');
      expect(service.getBadgeCount('message')).toBe(1);
    });

    it('should increment multiple times', () => {
      service.incrementBadgeCount('message');
      service.incrementBadgeCount('message');
      expect(service.getBadgeCount('message')).toBe(2);
    });
  });

  describe('decrementBadgeCount', () => {
    it('should decrement badge count', () => {
      service.setBadgeCount('message', 5);
      service.decrementBadgeCount('message');
      expect(service.getBadgeCount('message')).toBe(4);
    });

    it('should not go below 0', () => {
      service.decrementBadgeCount('message');
      expect(service.getBadgeCount('message')).toBe(0);
    });
  });
});
```

## Integration Testing

### Testing Socket Events

```typescript
describe('Badge Service Socket Integration', () => {
  let service: NotificationBadgeService;
  let socket: Socket;

  beforeEach((done) => {
    socket = io('http://localhost:5000');
    service = new NotificationBadgeService();
    service.initialize(socket);
    socket.on('connect', done);
  });

  it('should update badge on socket event', (done) => {
    service.onBadgeUpdate((type, count) => {
      expect(type).toBe('message');
      expect(count).toBe(3);
      done();
    });

    // Simulate server sending badge update
    socket.emit('badge:update', { type: 'message', count: 3 });
  });

  it('should handle badge reset', (done) => {
    service.setBadgeCount('message', 5);
    
    socket.on('badge:reset', () => {
      expect(service.getBadgeCount('message')).toBe(0);
      done();
    });

    socket.emit('badge:reset', { type: 'message' });
  });
});
```

## Manual Testing Checklist

- [ ] Badge service initializes without errors
- [ ] Can retrieve badge counts
- [ ] Badge counts increment correctly
- [ ] Badge counts decrement correctly
- [ ] Badge counts reset to 0
- [ ] Event listeners receive updates
- [ ] Multiple event listeners work simultaneously
- [ ] Cleanup removes all listeners
- [ ] Socket disconnect is handled gracefully
- [ ] Reconnection resets badge counts

## Performance Testing

### Memory Usage

```typescript
const service = new NotificationBadgeService();
const socket = io('http://localhost:5000');
service.initialize(socket);

const iterations = 10000;
for (let i = 0; i < iterations; i++) {
  service.incrementBadgeCount('message');
  service.decrementBadgeCount('message');
}

console.log('Badge count:', service.getBadgeCount('message')); // Should be 0
```

### Event Handling Performance

```typescript
const listener = (type: string, count: number) => {
  // Performance tracking
};

const start = performance.now();

for (let i = 0; i < 1000; i++) {
  service.onBadgeUpdate(listener);
}

const end = performance.now();
console.log(`Added 1000 listeners in ${end - start}ms`);
```

## Debugging Tips

1. Enable socket debug logging:
   ```typescript
   localStorage.debug = 'socket.io-client:*';
   ```

2. Check badge state:
   ```typescript
   console.log(service.getTotalBadgeCount());
   ```

3. Verify event listeners:
   ```typescript
   service.onBadgeUpdate((type, count) => {
     console.log(`Badge update: ${type} = ${count}`);
   });
   ```
