import WebSocket from 'ws';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.File({ filename: 'webSocket.log' })
    ]
});

export default function startWebSocket() {

    const wss_port = Number(process.env.PORT) ?? 3000;
    const wss = new WebSocket.Server({ port: wss_port });

    wss.on('connection', (ws) => {
        logger.info('Client connected');
        
        
        ws.send('Welcome');

        ws.on('message', (message) => {
            logger.info(`'received:', ${message}`);
            ws.send(`Server received: ${message}`);
        });

    });

    console.log(`WebSocket server started on port ${wss_port}`);    

}

