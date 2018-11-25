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
var Board_1 = require("./Board");
var BoardHandler = /** @class */ (function (_super) {
    __extends(BoardHandler, _super);
    function BoardHandler(c_owner) {
        var _this = _super.call(this) || this;
        _this.owner = c_owner;
        return _this;
    }
    return BoardHandler;
}(Board_1.Board));
exports.BoardHandler = BoardHandler;
//# sourceMappingURL=BoardHandler.js.map