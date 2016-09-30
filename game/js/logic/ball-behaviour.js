'use strict';

import read from 'ok-selector';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  func: function () {
    return {
      changeColour: function changeColour (state) {
        var demeanour = read(state, 'demo.ball.demeanour');

        return [
          'demo.ball.demeanour', demeanour === 'happy' ? 'angry' : 'happy'
        ];
      }
    };
  }
};