import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { globalErrorHandler } from './globalErrorHandler/globalErrorHandler';
import { global404Handler } from './globalErrorHandler/global404Handler'
import connectDB from './db/conn';
import truckRoutes from './routes/truckRoute';
import messageRoutes from './routes/messageRoute';
import orderRoutes from './routes/orderRoute';
import usersRoutes from './routes/userRoute';
import seedRoute from './routes/seedRoute';
import hateoas from './hateos/hateoas';
import { requestLogger } from './middleware/requestLogger';
import awsS3Route from './routes/awsS3Route'

dotenv.config();
const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(requestLogger); //to log all incoming requests with body into http.log

app.get('/api/v1', hateoas.getRootHateoas);

app.use('/api/v1/seed', seedRoute); //seeding

app.use('/api/v1/trucks', truckRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/s3-url', awsS3Route);

app.use(global404Handler); //404 handler

app.use(globalErrorHandler); //global error handler

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

