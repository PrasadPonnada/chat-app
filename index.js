const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connectd!');

  socket.on('disconnect', () => {
    console.log('Uset disconnected!');
  });

  socket.on('chat message', (msg) => {
    console.log('message ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Server runnuing on http://localhost:3000');
});
