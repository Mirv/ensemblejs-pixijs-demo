'use strict';

import read from 'ok-selector';
var PIXI = require('pixi.js');

//jshint maxparams:false
module.exports = {
  type: 'OnClientReady',
  deps: ['Config', 'StateTracker', 'DefinePlugin', 'CurrentState', 'CurrentServerState', '$'],
  func: function View (config, tracker, define, currentState, currentServerState, $) {

    function updateBall (current, prior, ball) {
      ball.position.x = current.get('x');
      ball.position.y = current.get('y');
    }

    function updateColour (current, prior, ball) {
      ball.tint = current === 'happy' ? 0xffffff : 0x0000ff;
    }

    const theBallPosition = (state) => read(state, 'demo.ball.position');
    const theBallDemeanour = (state) => read(state, 'demo.ball.demeanour');
    const theBallRadius = (state) => read(state, 'demo.ball.radius');
    const theBoardDimensions = (state) => read(state, 'demo.board');

    function calculateOffset (boardDimensions, screenDimensions) {
      return {
        x: (screenDimensions.usableWidth - boardDimensions.width) / 2,
        y: (screenDimensions.usableHeight - boardDimensions.height) / 2
      };
    }

    function createClientBall () {
      var ball = new PIXI.Graphics();
      ball.beginFill(0x0000ff);
      ball.drawCircle(0, 0, currentState().get(theBallRadius));

      return ball;
    }

    function createBoard () {
      var board = new PIXI.Graphics();
      board.beginFill(0x38806F);
      board.drawRect(0, 0, currentState().get(theBoardDimensions).get('width'), currentState().get(theBoardDimensions).get('height'));

      return board;
    }

    var offset;
    return function setup (dims) {
      var stage = new PIXI.Container();
      var renderer = PIXI.autoDetectRenderer(dims.usableWidth, dims.usableHeight);
      $()('#' + config().client.element).append(renderer.view);

      offset = calculateOffset(currentState().get(theBoardDimensions).toJS(), dims);
      stage.position.x = offset.x;
      stage.position.y = offset.y;

      var clientBall = createClientBall();
      stage.addChild(createBoard());
      stage.addChild(clientBall);

      tracker().onChangeOf(theBallPosition, updateBall, clientBall);
      tracker().onChangeOf(theBallDemeanour, updateColour, clientBall);

      define()('OnRenderFrame', function OnRenderFrame () {
        return function renderScene () {
          renderer.render(stage);
        };
      });
    };
  }
};