import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import error from './error/error';
import hateoas from './hateoas/hateoas';
import truckRoutes from './routes/trucksRoutes';
import orderRoutes from './routes/ordersRoutes';
import messageRoutes from './routes/messageRoutes';
import truckViewRoutes from './routes/truckViewRoutes';
import winston from 'winston';


//setup
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use('/styles', express.static(path.join(__dirname,'./views/styles')));
app.use('/scripts', express.static(path.join(__dirname,'./views/scripts')));

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  transports: [
    //new winston.transports.Console(),                       //will not log to console only to file
    new winston.transports.File({ filename: 'http.log' })
  ]
});

logger.info('This is a test winston message');

//winston to log all incoming http requests
app.use((req, res, next) => {
  logger.http(`Incoming request: ${req.method} ${req.url}`);
  next();
});

//middleware
app.use(express.json());

//adding routes
app.use ('/trucks',truckViewRoutes);
app.use ('/api/trucks',truckRoutes);
app.use ('/api/orders',orderRoutes);
app.use ('/api/messages',messageRoutes);

// Adding some HATEOAS links.
app.get('/', hateoas.getRootHateoas);
app.get('/api', hateoas.getApiHateoas);
app.get('/teapot', (req,res,next) => {
  next(error(418, `I'm a teapot`));
} )

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, 'Resource Not Found'));
});

//error handling
app.use((err: any, req:Request, res:Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

  
  // Listener
app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}`);
  });