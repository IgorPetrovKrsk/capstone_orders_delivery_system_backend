import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import winston from 'winston';
import { globalErrorHandler } from './globalErrorHandler/globalErrorHandler';
import { global404Handler } from './globalErrorHandler/global404Handler'
import connectDB from './db/conn';
import truckRoutes from './routes/truckRoute';
import messageRoutes from './routes/messageRoute';
import orderRoutes from './routes/orderRoute';
import seedRoute from './routes/seedRoute';
import hateoas from './hateos/hateoas';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'http.log' })
    ]
});

//logger.info('This is a test winston message');

//winston to log all incoming http requests
app.use((req, res, next) => {
    logger.http(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get('/api/v1', hateoas.getRootHateoas);

app.use('/api/v1/seed', seedRoute); //seeding

app.use('/api/v1/trucks', truckRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/orders', orderRoutes);

app.use(global404Handler); //404 handler

app.use(globalErrorHandler); //global error handler

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

