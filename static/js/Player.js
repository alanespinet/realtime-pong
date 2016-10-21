function Player(x, y, isRemote){
  this.x = x;
  this.y = y;
  this.velX = 0;
  this.velY = 0;
  this.isRemote = isRemote;
}

Player.prototype.update = function(){
  this.x += this.velX;
  this.y += this.velY;
  ioClient.emit("player_moved", {x: this.x, y: this.y, lastMove: new Date().getTime()});
};

Player.prototype.render = function(ctx){
  if(this.isRemote) {
    ctx.strokeStyle = '#00f';
  }
  ctx.strokeRect(this.x, this.y, 50, 150);
  ctx.strokeStyle = '#000';
}

Player.prototype.initControls = function(speed){
  let self = this;
  window.onkeydown = function(e){
    if(e.keyCode === 37) self.velX = -speed;
    if(e.keyCode === 39) self.velX = speed;
    if(e.keyCode === 38) self.velY = -speed;
    if(e.keyCode === 40) self.velY = speed;
  }

  window.onkeyup = function(e){
    if(e.keyCode === 37) self.velX = 0;
    if(e.keyCode === 39) self.velX = 0;
    if(e.keyCode === 38) self.velY = 0;
    if(e.keyCode === 40) self.velY = 0;
  }
}
