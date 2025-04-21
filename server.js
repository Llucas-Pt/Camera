// server.js
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static('public')); // Serve os arquivos estáticos (camera.html e viewer.html)

io.on('connection', socket => {
  console.log('Novo cliente conectado');

  socket.on('video-chunk', data => {
    // Transmite os dados de vídeo para todos os clientes, exceto o que enviou
    socket.broadcast.emit('video-chunk', data);
  });
});

server.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
