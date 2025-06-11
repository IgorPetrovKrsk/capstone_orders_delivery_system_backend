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

    const wss_port = Number(process.env.WEB_SOCKET_PORT) ?? 3001;
    const wss = new WebSocket.Server({ port: wss_port });
    const userSocketArray: Array<{ user:any ; ws: WebSocket }> = [];


    wss.on('connection', (ws) => {
        logger.info('Client connected');

        ws.on('message', (message) => {
            logger.info(`'received:', ${message}`);
            ws.send(`Server received: ${message}`); //sending back just for test should comment prior relise

            const data = JSON.parse(message.toString());
            if (data.user) {
                const user = data.user;
                userSocketArray.push({user,ws})                
                return;
            }

            if (data.truck && data.message){
                const recieverWs = userSocketArray.find(it=> it.user.truck == data.truck._id)?.ws;
                if (recieverWs){
                    recieverWs.send(data.message);
                }
            }
        });

    });

    console.log(`WebSocket server started on port ${wss_port}`);

}

