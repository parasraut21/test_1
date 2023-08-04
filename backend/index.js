const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketIO = require('socket.io')
app.use(cors());

app.use(cors({
	origin: "*",
	credentials: true
}))

const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
      origin: '*',
    }
  });

io.on("connection", (socket) => {
 

  socket.on("join_room", (data) => {
    console.log(`User Connected: ${socket.id}`);
    socket.join(data);
    // socket.to(data.userName).emit("joined_opponent", data);
  });

  socket.on("send_message", (data) => {
    
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("get_username", (userName) => {
   
    socket.emit("receive_username", userName);
  });


  socket.on('move_piece', (data) => {
    socket.to(data.room).emit('opponent_moved', {
      selectedId: data.selectedId,
      finalPosition: data.finalPosition,
    });
  });

  // socket.on("disconnect", () => {
  //   console.log(`User Disconnected: ${socket.id}`);
  // });
});


server.listen(8000, () => {
  console.log("SERVER IS RUNNING");
});