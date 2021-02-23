const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom, getQuantityUsers, deleteUser } = require('./users');

const index = require('./router/index');
const roomRouter = require('./router/room');
const config = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use(index);
app.use(roomRouter);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room, limitPeople }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    const isOverLimit = limitPeople < getQuantityUsers();
    if(error || isOverLimit) {
      deleteUser(socket.id);
      return callback(error || "Room is full");
    }

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(config.port, () => console.log(`Server has started on ${config.port}.`));