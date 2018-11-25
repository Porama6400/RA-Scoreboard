import {ClientHandler} from "./ClientHandler";
import {Board} from "./Board";

export class BoardHandler extends Board{
    public owner: ClientHandler;
    constructor(c_owner: ClientHandler) {
        super();
        this.owner = c_owner;
    }
}