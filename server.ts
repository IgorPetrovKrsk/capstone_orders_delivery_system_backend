import express from 'express';
import dotenv from 'dotenv';
import { globalErrorHandler } from './globalErrorHandler/globalErrorHandler';
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

app.use(express.json());

app.get('/', hateoas.getRootHateoas);

app.use('/seed', seedRoute); //seeding

app.use('/trucks',truckRoutes);
app.use('/messages',messageRoutes);
app.use('/orders',orderRoutes);

app.use(globalErrorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);    
});

