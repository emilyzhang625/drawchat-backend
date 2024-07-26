const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("createOrJoin", (roomID) => {
    const room = io.sockets.adapter.rooms.get(roomID);

    if (room) console.log(`Joining existing room: ${roomID}`);
    else console.log(`Creating new room: ${roomID}`);

    socket.join(roomID);
  });
});
