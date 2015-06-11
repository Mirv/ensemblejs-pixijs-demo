'use strict';

module.exports = {
  type: 'BouncingBallGame',
  deps: ['DefinePlugin', 'BouncingBallGame-Behaviour'],
  func: function(define, behaviour) {
    return function() {

      define()('StateSeed', function () {
        return {
          'bouncing-ball-game': {
            ball: {
              position: { x: 100, y: 50 },
              speed: { x: 100, y: 50 },
              radius: 25,
              demeanour: 'happy'
            },
            board: {
              width: 500,
              height: 500
            }
          }
        };
      });

      define()('ServerSideUpdate', [], function() {
        return function (state, delta) {
          var ball = state.for('bouncing-ball-game').get('ball');
          var board = state.for('bouncing-ball-game').get('board');

          var pos = ball('position');
          var radius = ball('radius');
          var speed = ball('speed');

          var newPos = {
            x: pos('x') + speed('x') * delta,
            y: pos('y') + speed('y') * delta
          };

          var newSpeed = {
            x: speed('x'),
            y: speed('y')
          };

          if ((newPos.x + radius >= board('width')) || (newPos.x - radius <= 0)) {
            newSpeed.x = speed('x') * -1;
          }
          if ((newPos.y + radius >= board('height')) || (newPos.y - radius <= 0)) {
            newSpeed.y = speed('y') * -1;
          }

          return {
            'bouncing-ball-game': {
              ball: {
                position: newPos,
                speed: newSpeed
              }
            }
          };
        };
      });

      define()('ActionMap', function () {
        return {
          'button1': [{target: behaviour().changeColour, onRelease: true}]
        };
      });
    };
  }
};