document.addEventListener('DOMContentLoaded', function() {
  var gameProperties = {
    debug : true,
    timeLineDiv : "timeline-wrapper",
    points: 10
  };
  var game = new Game(gameProperties);
  
  game.load("media/test.mp3");

  // workout to wait for the loaded song.
  // This will change when there's a button to start.
  setTimeout(function() {
    game.start();
  }, 2000);
  //game.start();
}, false);
