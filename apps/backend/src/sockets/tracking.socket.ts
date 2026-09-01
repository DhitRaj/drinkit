import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server | null = null;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    // Join room for real-time tracking of a specific order
    socket.on('join_order_room', (orderId: string) => {
      socket.join(`order_${orderId}`);
      console.log(`[Socket.io] Socket ${socket.id} joined room: order_${orderId}`);
    });

    socket.on('leave_order_room', (orderId: string) => {
      socket.leave(`order_${orderId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const notifyOrderUpdate = (orderId: string, payload: any) => {
  if (io) {
    io.to(`order_${orderId}`).emit('order_status_update', payload);
    io.emit('global_order_feed', { orderId, ...payload });
  }
};

export const broadcastRiderLocation = (orderId: string, location: { latitude: number; longitude: number }) => {
  if (io) {
    io.to(`order_${orderId}`).emit('rider_location_update', location);
  }
};
