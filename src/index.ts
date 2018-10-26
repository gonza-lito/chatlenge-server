import * as express from 'express';
import * as http from 'http';

import socketio= require( 'socket.io');

const app = express();
const server = new http.Server(app);
const socket = socketio(server);

const port = process.env.PORT || 8080;

socket.on('connect', () => {
    // tslint:disable-next-line:no-console
    console.log('connection up!');
});
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server on port ${port}`);
});
