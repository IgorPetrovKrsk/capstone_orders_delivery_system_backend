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
            //ws.send(`Server received: ${message}`); //sending back just for test should comment prior relise
            const data = JSON.parse(message.toString());
            if (data.user) {
                const user = data.user;
                const currentUsersWS = userSocketArray.find(it=> it.user._id == data.user._id);
                if (currentUsersWS){
                    currentUsersWS.ws = ws; 
                } else{
                    userSocketArray.push({user,ws});
                }                
                ws.send(JSON.stringify({from:'Server',message:`User ${data.user.username} has loged in to WebSockets`}));
                return;
            }

            if (data.truck && data.message){
                const recieverWs = userSocketArray.find(it=> it.user.truck == data.truck._id)?.ws;
                if (recieverWs){
                    recieverWs.send(JSON.stringify({from:data.from.username,message:data.message}));                    
                }
            }
        });

    });

    console.log(`WebSocket server started on port ${wss_port}`);

}

