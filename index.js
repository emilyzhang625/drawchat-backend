const { generateRandomUsername } = require("./modules/username");
require("dotenv").config();

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;
const io = require("socket.io")(PORT, {
  cors: {
    origin: [SERVER_URL],
  },
});

const userMap = new Map();

io.on("connection", (socket) => {
  const username = generateRandomUsername();
  userMap.set(socket.id, username);

  socket.on("createOrJoin", (roomID, currSocket, message) => {
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) {
      message(
        `You joined room ${roomID} as ${userMap.get(
          currSocket
        )}, starting off with a blank canvas`
      );
    } else {
      message(
        `You created room ${roomID} as ${userMap.get(
          currSocket
        )}, incoming users start off with a blank canvas`
      );
    }

    socket.join(roomID);
    socket
      .to(roomID)
      .emit("getMessage", `${userMap.get(socket.id)} joined room`);

    io.to(roomID).emit("updateSize", io.sockets.adapter.rooms.get(roomID).size);
  });

  socket.on("leaveRoom", (roomID) => {
    socket.leave(roomID);
    socket.to(roomID).emit("getMessage", `${userMap.get(socket.id)} left room`);
    if (io.sockets.adapter.rooms.get(roomID))
      io.to(roomID).emit(
        "updateSize",
        io.sockets.adapter.rooms.get(roomID).size
      );
  });

  socket.on("sendMessage", (roomID, currSocket, message) => {
    socket
      .to(roomID)
      .emit("getMessage", `${userMap.get(currSocket)}: ${message}`);
  });

  socket.on("draw", (roomID, data) => {
    socket.to(roomID).emit("drawing", data);
  });

  socket.on("startDraw", (roomID, data) => {
    socket.to(roomID).emit("startDrawing", data);
  });

  socket.on("endDraw", (roomID) => {
    socket.to(roomID).emit("endDrawing");
  });

  socket.on("clearDraw", (roomID) => {
    socket.to(roomID).emit("clearDrawing");
  });
});
