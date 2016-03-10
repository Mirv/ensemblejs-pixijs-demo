'use strict';

module.exports = {
  type: 'StateSeed',
  deps: ['Config'],
  func: function (config) {
    return {
      demo: {
        ball: {
          position: { x: 100, y: 50 },
          velocity: { x: 150, y: -100 },
          radius: 25,
          demeanour: 'happy'
        },
        board: {
          width: config().demo.board.width,
          height: config().demo.board.height,
        }
      }
    };
  }
};