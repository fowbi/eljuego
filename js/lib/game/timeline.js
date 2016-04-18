function TimeLine(song, area, points) {
  this.song = song;
  this.area = area;
  this.points = points;

  var timePoints = this.generatePoints(this.song, this.points);

  this.renderer = new TimeLineRenderer({area:this.area});
  for (var i = 0, len = timePoints.length; i < len; i++) {
    percentage = (timePoints[i]/song.duration)*100;
    this.renderer.addPoint(new TimeLinePoint(timePoints[i], percentage));
  }
  this.renderer.draw();
}

TimeLine.prototype.generatePoints = function(song, numOfPoints) {
    var _points = [], minPoint = 2000; // Do not put a point in the first 2 seconds.
    songDurationMs = (song.duration-2) * 1000; //do not put a point in the last 2 seconds
    for (var i = 0; i < numOfPoints; i++) {
      time = (Math.random()*(songDurationMs-minPoint+1)+minPoint) / 1000;
      _points.push(time);
    }
    _points.sort(function(a, b) { return a-b; });
    return _points;
};

TimeLine.prototype.start = function() {
  var self = this;
  this.song.play();
  this.progressInterval = setInterval(function () {
    self.progress(self);
  //}, 250);
  }, 33);
  return;
};

TimeLine.prototype.progress = function(timeline) {
  var currentTime = timeline.song.currentTime;
  this.renderer.progress(new TimeLinePoint(
    currentTime,
    (currentTime/timeline.song.duration)*100));

  if (timeline.song.duration <= currentTime) {
    clearInterval(timeline.progressInterval);
  }
};

TimeLine.prototype.checkPress = function(keyCode) {
  if (this.currentSound !== null && (this.currentSound.keyCode === keyCode)) {
    console.log('correct');
  }
};
