const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", ws => {
  const id = Date.now().toString();
  ws.id = id;
  clients.push(ws);

  ws.on("message", message => {
    const data = JSON.parse(message);
    data.id = ws.id;
    // Broadcast cho tất cả client khác
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("WebSocket server chạy tại ws://localhost:8080");
