const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("createOrJoin", (roomID, message) => {
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) message(`Joining existing room ${roomID}`);
    else message(`Creating new room ${roomID}`);

    socket.join(roomID);
  });

  socket.on("leaveRoom", (roomID, message) => {
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) {
      message(`Leaving room ${roomID}`);
      socket.leave(roomID);
    } else message("Error leaving room, currently not in a room.");
  });

  socket.on("sendMessage", (roomID, message, cbMessage) => {
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) {
      cbMessage(`Sending message to current room ${roomID}`);
      socket.to(roomID).emit("getMessage", message);
    } else cbMessage("Error sending message, currently not in a room.");
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
});
