import {Server} from "./Server";

// let server: Server = new Server(6440, null, null);

/**/
let server: Server = new Server(6440,
    "/etc/letsencrypt/live/www.otlg.net/privkey.pem",
    "/etc/letsencrypt/live/www.otlg.net/fullchain.pem");
/**/
