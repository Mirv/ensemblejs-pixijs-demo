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

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    return function (dims) {
      var stage = new PIXI.Stage(0x66FF99);
      var renderer = PIXI.autoDetectRenderer(dims.usableWidth, dims.usableHeight);
      $('#' + element()).append(renderer.view);

      var ball = new PIXI.Graphics();
      ball.beginFill(0x999999);
      ball.drawCircle(0,0,25);

      stage.addChild(ball);

      tracker().onChangeOf(theBallPosition, updateBall, ball);

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