const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("createOrJoin", (roomID, message) => {
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) message(`You joined room ${roomID}`);
    else message(`You created room ${roomID}`);

    socket.join(roomID);
    socket.to(roomID).emit("getMessage", `User joined room ${roomID}`);
  });

  socket.on("leaveRoom", (roomID) => {
    socket.leave(roomID);
    socket.to(roomID).emit("getMessage", `User left room ${roomID}`);
  });

  socket.on("sendMessage", (roomID, message) => {
    socket.to(roomID).emit("getMessage", message);
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
