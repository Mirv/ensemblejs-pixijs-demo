'use strict';

module.exports = {
  type: 'OnPhysicsFrame',
  func: function OnPhysicsFrame () {
    return function bounceBall (delta, state) {
      var pos = state.get('demo.ball.position');
      var velocity = state.get('demo.ball.velocity');

      var newPos = {
        x: pos('x') + velocity('x') * delta,
        y: pos('y') + velocity('y') * delta
      };

      return [
        'demo.ball', { position: newPos }
      ];
    };
  }
};