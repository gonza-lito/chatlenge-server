"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socket_io_1 = require("socket.io");
const app = express();
const server = new http.Server(app);
const socket = socket_io_1.default(server);
const port = process.env.PORT || 8080;
socket.on('connect', () => {
    // tslint:disable-next-line:no-console
    console.log('connection up!');
});
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server on port ${port}`);
});
//# sourceMappingURL=index.js.map