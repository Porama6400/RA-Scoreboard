"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Packet = /** @class */ (function () {
    function Packet() {
    }
    Packet.Channels = {
        Registry: "sbr",
        Score: "sbs"
    };
    return Packet;
}());
exports.Packet = Packet;
var PacketScoreboardRegistry = /** @class */ (function (_super) {
    __extends(PacketScoreboardRegistry, _super);
    function PacketScoreboardRegistry() {
        return _super.call(this) || this;
    }
    PacketScoreboardRegistry.Type = {
        REGISTER: 1,
        ACKNOWLEDGE: 2,
        USE: 10 // SPECIFIED WHAT SCOREBOARD TO REMOTE TO
    };
    return PacketScoreboardRegistry;
}(Packet));
exports.PacketScoreboardRegistry = PacketScoreboardRegistry;
//# sourceMappingURL=Packets.js.map