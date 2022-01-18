"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketScoreboardScore = exports.PacketScoreboardRegistry = exports.NetworkUpdateType = exports.Packet = void 0;
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
var NetworkUpdateType = /** @class */ (function () {
    function NetworkUpdateType() {
    }
    NetworkUpdateType.JOIN = "join";
    NetworkUpdateType.LEAVE = "leave";
    return NetworkUpdateType;
}());
exports.NetworkUpdateType = NetworkUpdateType;
var PacketScoreboardRegistry = /** @class */ (function (_super) {
    __extends(PacketScoreboardRegistry, _super);
    function PacketScoreboardRegistry() {
        return _super.call(this) || this;
    }
    PacketScoreboardRegistry.Type = {
        WELCOME: 0,
        REGISTER: 1,
        ACKNOWLEDGE: 2,
        MIRROR_REQUEST: 3,
        SOUND_REQUEST: 4,
        SYSMONITOR: 5,
        USE: 10,
        NETWORK_LIST: 20,
        NETWORK_UPDATE: 21,
    };
    return PacketScoreboardRegistry;
}(Packet));
exports.PacketScoreboardRegistry = PacketScoreboardRegistry;
var PacketScoreboardScore = /** @class */ (function (_super) {
    __extends(PacketScoreboardScore, _super);
    function PacketScoreboardScore() {
        return _super.call(this) || this;
    }
    PacketScoreboardScore.Type = {
        REQUEST: 1,
        RESPONSE: 2,
        UPDATE: 10,
        TIMER_STATUS: 20,
        TIMER_SET: 21,
        TIMER_PAUSE: 22,
        TIMER_END_ANNOUNCE: 23,
        SOUND: 30 // REQUEST SOUND PLAYING
    };
    return PacketScoreboardScore;
}(Packet));
exports.PacketScoreboardScore = PacketScoreboardScore;
//# sourceMappingURL=Packets.js.map