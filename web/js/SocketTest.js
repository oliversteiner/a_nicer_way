"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var SERVER_URL = 'http://localhost:3000';
var SocketTest = (function () {
    function SocketTest() {
        this.initSocket();
    }
    SocketTest.prototype.initSocket = function () {
        this.socket = socketIo(SERVER_URL);
    };
    SocketTest.prototype.send = function (message) {
        this.socket.emit('message', message);
    };
    SocketTest.prototype.get = function () {
    };
    return SocketTest;
}());
exports.default = SocketTest;
