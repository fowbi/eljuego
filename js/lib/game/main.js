function Game(startProperties) {
  this.prop = _.extend({
    debug: false,
    timeLineDiv: "timeline-wrapper",
    points: 20
  }, startProperties);

  /** PRIVATE */
  var addEventListeners = function() {
    document.addEventListener("keydown", function(e) {
      that.press(e.keyCode);
    }, false);
  };

  var that = this;
  this.currentStatus = 0;
  addEventListeners();
}

Game.prototype.log = function(message) {
  console.log(message);
};

Game.prototype.load = function(songFileName) {
  var self = this;
  this.song = new Audio(songFileName);
  this.song.addEventListener('loadedmetadata',function(){
    self.song.setAttribute('data-time', self.song.duration);
    self.timeline = new TimeLine(self.song, self.prop.timeLineDiv, self.prop.points);
  },false);
};

Game.prototype.start = function() {
  if (this.currentStatus === 1) {
    this.log('Game is already running');
    return;
  }

  this.currentStatus = 1;
  if (this.prop.debug) {
    this.log(this.getCurrentStatus());
  }

  this.timeline.start();
};

Game.prototype.end = function() {
  if (this.currentStatus === 0) {
    this.log("Game has already ended!");
    return;
  }
  this.currentStatus = 0;
  if (this.prop.debug) {
    this.log(this.getCurrentStatus());
  }
};

Game.prototype.pause = function() {
  if (this.currentStatus !== 1) {
    this.log("Game can not be paused, it's not running!");
    return;
  }

  this.currentStatus = 2;
  if (this.prop.debug) {
    this.log(this.getCurrentStatus());
  }
};

Game.prototype.getCurrentStatus = function() {
  switch (this.currentStatus) {
    case 1:
      return 'Running';
      break;
    case 2:
      return 'Paused';
      break;
    case 0:
    default:
      return 'Not Running';
  }

  return 'Not Running';
};

Game.prototype.press = function(keyCode) {
  //if (this.currentStatus === 1) {
    //this.timeline.checkPress(keyCode);
  //}
};
