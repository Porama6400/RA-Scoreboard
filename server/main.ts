import {Server} from "./Server";

//let server: Server = new Server(6440, null, null);


let server: Server = new Server(6440,
    "/etc/letsencrypt/archive/www.otlg.net/privkey1.pem",
    "/etc/letsencrypt/archive/www.otlg.net/cert1.pem");