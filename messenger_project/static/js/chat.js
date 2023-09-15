const chatSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/chat/' + roomName + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const message = data.message;
};

chatSocket.onclose = function(e) {
    console.error('WebSocket closed unexpectedly');
};

function sendMessage(message) {
    chatSocket.send(JSON.stringify({
        'message': message
    }));
}
