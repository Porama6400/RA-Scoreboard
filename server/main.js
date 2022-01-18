"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server");
// let server: Server = new Server(6440, null, null);
/**/
var server = new Server_1.Server(6440, "/etc/letsencrypt/live/www.otlg.net/privkey.pem", "/etc/letsencrypt/live/www.otlg.net/fullchain.pem");
/**/
//# sourceMappingURL=main.js.map