'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  deps: ['StateAccess'],
  func: function (state) {
    return {
      changeColour: function (data) {
        var ball = state().for(data.gameId, 'bouncing-ball-game').get('ball');

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