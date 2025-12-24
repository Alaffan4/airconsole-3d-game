const socket = io();

function send(x, y) {
  socket.emit("input", { x, y });
}
