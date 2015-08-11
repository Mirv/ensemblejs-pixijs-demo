'use strict';

var entryPoint = require('ensemblejs/src/client');
entryPoint.loadWindow(require('window'));
entryPoint.loadDefaults();
entryPoint.set('AspectRatio', 1);
entryPoint.load(require('./logic/ball-behaviour'));
entryPoint.load(require('./maps/action-map'));
entryPoint.load(require('./events/bounce-ball'));
entryPoint.load(require('./views/bouncing-ball'));
entryPoint.run();