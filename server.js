const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", ws => {
  clients.push(ws);

  ws.on("message", message => {
    // Broadcast trạng thái xe cho tất cả client khác
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("WebSocket server chạy tại ws://localhost:8080");
