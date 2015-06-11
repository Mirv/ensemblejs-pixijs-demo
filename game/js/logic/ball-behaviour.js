'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  func: function () {
    return {
      changeColour: function (state) {
        var ball = state.for('bouncing-ball-game').get('ball');

        var current = ball('demeanour');
        var newDemeanour = (current === 'happy' ? 'angry' : 'happy');

        return {
          'bouncing-ball-game': {
            ball: {
              demeanour: newDemeanour
            }
          }
        };
      }
    };
  }
};