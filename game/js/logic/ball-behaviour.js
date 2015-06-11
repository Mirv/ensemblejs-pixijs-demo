'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  deps: ['StateAccess', 'NewState'],
  func: function (state, newState) {
    return {
      changeColour: function (data) {
        var ball = state().for(data.gameId, 'bouncing-ball-game').get('ball');

        var current = ball('demeanour');
        var newDemeanour = (current === 'happy' ? 'angry' : 'happy');

        return newState().create('bouncing-ball-game', {
          ball: {
            demeanour: newDemeanour
          }
        });
      }
    };
  }
};