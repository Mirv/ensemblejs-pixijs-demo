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

    return function (dims) {
      var stage = new PIXI.Container();
      var renderer = PIXI.autoDetectRenderer(dims.usableWidth, dims.usableHeight);
      $('#' + element()).append(renderer.view);

      var ball = new PIXI.Graphics();
      ball.beginFill(0xffffff);
      ball.drawCircle(0,0,25);

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