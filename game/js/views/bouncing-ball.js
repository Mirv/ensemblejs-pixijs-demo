'use strict';

var PIXI = require('pixi.js');
var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'StateTracker', 'DefinePlugin'],
  func: function (element, tracker, define) {
    var updateBall = function(current, prior, ball) {
      ball.position.x = current.x;
      ball.position.y = current.y;
    };

    var updateColour = function(current, prior, ball) {
      if (current === 'happy') {
        ball.tint = 0xffffff;
      } else {
        ball.tint = 0xff0000;
      }
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    var theBallDemeanour = function (state) {
      return state['bouncing-ball-game'].ball.demeanour;
    };

    var theBallRadius = function (state) {
      return state['bouncing-ball-game'].ball.radius;
    };

    var theBoardDimensions = function (state) {
      return state['bouncing-ball-game'].board;
    };

    var calculateOffset = function (boardDimensions, screenDimensions) {
      return {
        x: (screenDimensions.usableWidth - boardDimensions.width) / 2,
        y: (screenDimensions.usableHeight - boardDimensions.height) / 2
      };
    };

    var createBall = function () {
      var ball = new PIXI.Graphics();
      ball.beginFill(0xffffff);
      ball.drawCircle(0, 0, tracker().get(theBallRadius));

      return ball;
    };

    var createBoard = function () {
      var board = new PIXI.Graphics();
      board.beginFill(0x55ff55);
      board.drawRect(0, 0, tracker().get(theBoardDimensions).width, tracker().get(theBoardDimensions).height);

      return board;
    };

    var offset;
    return function (dims) {
      var stage = new PIXI.Container();
      var renderer = PIXI.autoDetectRenderer(dims.usableWidth, dims.usableHeight);
      $('#' + element()).append(renderer.view);

      offset = calculateOffset(tracker().get(theBoardDimensions), dims);
      stage.position.x = offset.x;
      stage.position.y = offset.y;

      var ball = createBall();
      stage.addChild(createBoard());
      stage.addChild(ball);

      tracker().onChangeOf(theBallPosition, updateBall, ball);
      tracker().onChangeOf(theBallDemeanour, updateColour, ball);

      define()('OnEachFrame', function () {
        return function () {
          renderer.render(stage);
        };
      });
    };
  }
};