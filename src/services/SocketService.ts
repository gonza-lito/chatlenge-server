import { Server } from 'socket.io';
import { IMessage } from 'src/interfaces/IMessage';

import { Events } from '../events/Events';
import logger from '../logger';
import ChatService from './ChatService';
import UserService from './UserService';

import uuid = require('uuid');

export default class SocketServer {
    private socketServer: Server;
    private userService: UserService = new UserService();
    private chatService: ChatService = new ChatService();

    constructor(socketServer: Server) {
        this.socketServer = socketServer;
    }

    public init(): void {
        this.socketServer.on('connect', (socket) => {
            socket.on(Events.userLogIn, (userName: string, respondWith) => {
                try {
                    const user = this.userService.logIn(userName, socket);
                    this.socketServer.emit(Events.userListUpdate, this.userService.getUsers());
                    socket.emit(Events.messagesUpdate, this.chatService.getHistory());
                    socket.broadcast.emit(Events.userConnected, user.name);
                    respondWith(user);

                } catch (e) {
                    logger.error(e);
                    respondWith(e.message);
                }
            });

            socket.on(Events.userTyping, (userName: string) => {
                socket.broadcast.emit(Events.userTyping, userName);
            });
            socket.on(Events.userStoppedTyping, (userName: string) => {
                socket.broadcast.emit(Events.userStoppedTyping, userName);
            });

            socket.on(Events.messageSend, (message: IMessage) => {
                message.id = uuid();
                this.socketServer.emit(Events.messagesUpdate, this.chatService.addMessage(message));
            });

            socket.on('disconnect', () => {
                try {
                    logger.info(`disconnecting: ${socket.id}`);
                    const user =  this.userService.logOutBySocketId(socket.id);
                    this.socketServer.emit(Events.userListUpdate, this.userService.getUsers());
                    this.socketServer.emit(Events.userDisconnected, user.name);
                } catch (e) {
                    logger.error(e.message);
                }
            });
        });
    }

}
