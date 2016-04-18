function TimeLineRenderer (prop) {
  this.defaultWidth = 1000;
  this.defaultHeight = 200;
  this.defaultMargin = 100;
  this.points = [];
  this.prop = _.extend({
    area: 'timeline-wrapper',
    width: this.defaultWidth,
    height: this.defaultHeight,
    margin: this.defaultMargin
  }, prop);
  this.prop['lineLength'] = this.prop.width - (this.prop.margin*2);
  this.canvas = null;
}
TimeLineRenderer.prototype.getCanvas = function() {
  if (this.canvas === null) {
    this.canvas = this.createCanvas(this.prop.area, this.prop.width, this.prop.height);
  }
  return this.canvas;
};

TimeLineRenderer.prototype.addPoint = function(point) {
  this.points.push(point);
};

TimeLineRenderer.prototype.draw = function() {
  var numOfPoints = this.points.length,
    canvas = this.getCanvas();
  this.drawMainLine(canvas);
};

TimeLineRenderer.prototype.createCanvas = function(area, width, height) {
  var canvasDiv = document.getElementById(area);
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.setAttribute('id', 'timeline');
  canvasDiv.appendChild(canvas);
  if(typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
  }

  return canvas;
};

TimeLineRenderer.prototype.drawMainLine = function(canvas) {
  var context = canvas.getContext("2d");

  // Draw starting line
  context.beginPath();
  context.moveTo(this.prop.margin, this.prop.margin);
  context.lineTo(this.prop.width-this.prop.margin, this.prop.margin);
  context.stroke();

  // Draw all points on that line.
  var self = this, x1, y1 = this.prop.margin,
    x2, y2 = this.prop.margin-10;
  this.points.forEach(function(point) {
    context.beginPath();
    x1 = x2 = self.prop.margin + ((self.prop.lineLength/100) * point.percentage);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  });
};

TimeLineRenderer.prototype.progress = function(point) {
  var context = this.canvas.getContext("2d");
  context.clearRect(0,0,this.canvas.width, this.canvas.height);

  this.drawMainLine(this.canvas);

  context.beginPath();
  var x1 = x2 = this.prop.margin + ((this.prop.lineLength/100) * point.percentage),
    y1 = this.prop.margin+2,
    y2 = y1+10;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};
