import * as express from 'express';
import * as http from 'http';

import logger from './logger';
import SocketServer from './services/SocketService';

import socketio = require( 'socket.io');
const app = express();
const server = new http.Server(app);
const socket = socketio(server);

const port = process.env.PORT || 8080;

const socketServer = new SocketServer(socket);
socketServer.init();
server.listen(port, () => {
    logger.info(`Server on port ${port}`);
});
