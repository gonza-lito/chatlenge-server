import { takeRight } from 'lodash';
import { IMessage } from 'src/interfaces/IMessage';

export default class ChatService {
    private history: IMessage[];

    public addMessage(message: IMessage): IMessage[] {
        this.history = takeRight(this.history, 9).concat([message]);
        return this.history;
    }

    public getHistory(): IMessage[] {
        return this.history;
    }
}
