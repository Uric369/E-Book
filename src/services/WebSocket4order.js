let websocket;
let lockReconnect = false;
const createWebSocket = (url, handleEvent) => {
    websocket = new WebSocket(url);
    websocket.onopen = function () {
        heartCheck.reset().start();
    }
    websocket.onerror = function () {
        reconnect(url);
    };
    websocket.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    }
    websocket.onmessage = function (event) {
        lockReconnect = true;
        handleEvent(event);
    }
}
const reconnect = (url) => {
    if (lockReconnect) return;
    setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 4000);
}
const heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    reset: function () {
        clearInterval(this.timeoutObj);
        return this;
    },
    start: function () {
        this.timeoutObj = setInterval(() => {
            websocket.send("HeartBeat");
        }, this.timeout)
    }
}
const closeWebSocket = () => {
    websocket && websocket.close();
}

export { websocket, createWebSocket, closeWebSocket };
