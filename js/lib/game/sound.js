function Sound(musicFileName, keyCode) {
  this.musicFileName = musicFileName;
  this.keyCode = keyCode;

  this.audio = new Audio(this.musicFileName);
}

Sound.prototype.play = function() {
  this.audio.play();
};
