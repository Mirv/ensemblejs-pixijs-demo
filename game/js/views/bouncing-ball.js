'use strict';

var PIXI = require('pixi.js');
var $ = require('zepto-browserify').$;

module.exports = {
  type: 'View',
  deps: ['Element', 'StateTracker', 'DefinePlugin'],
  func: function (element, tracker, define) {
    var updateBall = function(currentPosition, priorPosition, ball) {
      if (currentPosition === undefined) {
        ball.position.x = priorPosition.x;
        ball.position.y = priorPosition.y;
      } else {
        ball.position.x = currentPosition.x;
        ball.position.y = currentPosition.y;
      }
    };

    var updateColour = function(currentColour, priorColour, ball) {
      if (currentColour === undefined) {
        ball.tint = priorColour;
      } else {
        ball.tint = currentColour;
      }
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    var theBallColour = function (state) {
      return state['bouncing-ball-game'].ball.colour;
    };

    return function (dims) {
      var stage = new PIXI.Container();
      var renderer = PIXI.autoDetectRenderer(dims.usableWidth, dims.usableHeight);
      $('#' + element()).append(renderer.view);

      var ball = new PIXI.Graphics();
      ball.beginFill(0xffffff);
      ball.drawCircle(0,0,25);

      stage.addChild(ball);

      tracker().onChangeOf(theBallPosition, updateBall, ball);
      tracker().onChangeOf(theBallColour, updateColour, ball);

      define()('OnEachFrame', function () {
        return function () {
          renderer.render(stage);
        };
      });

      define()('OnResize', function () {
        return function () {};
      });
    };
  }
};