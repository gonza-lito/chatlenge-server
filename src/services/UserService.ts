import { find, remove } from 'lodash';
import { Socket } from 'socket.io';

import IUser from '../interfaces/IUser';

import uuid = require('uuid');
export default class UserService {

    private userList: IUser[] = [];

    public logIn(userName: string, userSocket: Socket): IUser {
        if (find(this.userList, ['name', userName])) {
            throw Error('User name already taken!');
        }
        const user = { name: userName, id: uuid(), socketId: userSocket.id };
        this.userList.push(user);
        return user;
    }
    public logOut(user: IUser): IUser[] {
        if (!remove(this.userList, (usr) => usr.id === user.id)) {
            throw Error('User not found!');
        }
        return this.userList;
    }

    public logOutBySocketId(socketId: string): IUser[] {
        if (!remove(this.userList, (usr) => usr.socketId === socketId)) {
            throw Error('User not found!');
        }
        return this.userList;
    }
    public getUsers(): IUser[] {
        return this.userList;
    }
}
