const express = require('express');
const PORT = 3012;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// active connections
const CONNECTION_TIMEOUT = 10000;
const players = {};

// Middleware. Explains to express the path to find all the static files
// Otherwise, it would be needed a route for that static file (yes, sure...)
app.use( express.static("static") );

// Using the socket to check the connection events
// The 'Connection' event fires when a new connection is detected in the client.
// The argument 'socket' stores information about the new connection
io.on("connection", function(socket){
  console.log("New Player Connected:");
  console.log(socket.id);
  var playerCount = 0;
  for(var socketId in players) {
    if(new Date().getTime() - players[socketId].lastMove > CONNECTION_TIMEOUT){
      delete players[socketId];
    }
    else {
      playerCount++;
    }
  }
  if(playerCount < 2){
    players[socket.io] = {x:300, y:100, lastMove: new Date().getTime()};
    socket.on("player_moved", function(data){
      players[socket.io] = data;
      socket.broadcast.emit("player_moved", data);
    });
  }
});

setInterval(()=>console.log(players), 1000);

// Main route serves the index.html. The variable __dirname specifies the
// path where the index.js is located
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});


http.listen(PORT, () => console.log("Server listening on port " + PORT));
