import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { config } from './config/env';
import { errorHandler } from './middlewares/error.middleware';
import { initSocket } from './sockets/tracking.socket';

// Routes
import authRoutes from './routes/auth.routes';
import catalogRoutes from './routes/catalog.routes';
import cartRoutes from './routes/cart.routes';
import ordersRoutes from './routes/orders.routes';
import storesRoutes from './routes/stores.routes';
import deliveryRoutes from './routes/delivery.routes';
import paymentsRoutes from './routes/payments.routes';
import adminRoutes from './routes/admin.routes';

const app = express();
const server = http.createServer(app);

// Initialize WebSockets for real-time order tracking
initSocket(server);

// Security & Parsing Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Drinkit Express API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Mount V1 API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/catalog', catalogRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/stores', storesRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/admin', adminRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = config.port;
server.listen(PORT, () => {
  console.log(`\n⚡ ===================================================`);
  console.log(`⚡  Drinkit Express API Server running on port ${PORT}`);
  console.log(`⚡  Realtime 10-Min Tracking WebSockets: ACTIVE`);
  console.log(`⚡  Health Check: http://localhost:${PORT}/health`);
  console.log(`⚡ ===================================================\n`);
});
