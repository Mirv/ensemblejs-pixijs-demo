'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  func: function () {
    return {
      changeColour: function changeColour (state) {
        var demeanour = state.get('demo.ball.demeanour');

        return [
          'demo.ball.demeanour', demeanour === 'happy' ? 'angry' : 'happy'
        ];
      }
    };
  }
};