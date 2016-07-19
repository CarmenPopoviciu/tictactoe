#! /usr/bin/env node

(function() {
  'use strict';
  
  var game = require('./game');

  var myGame = game();
  myGame.start();

  // TODO(@carmen) move to Board
  var POSITIONS = [1,2,3,4,5,6,7,8,9];

  /////

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (input) {
    if (input === 'quit\n') done('Quitting... Bye bye o/');

    if(isValidPosition(input)) {
      var activePlayer = myGame.getActivePlayer(),
          winner = null;

      if(myGame.move(input, activePlayer) !== -1) {
        if(myGame.isOver()) {
          winner = myGame.getWinner();
          var msg = 'Game over! ' + (winner ?  'Winner is ' + winner.name : 'Draw. Nobody won :('); 
          console.log(msg);
          done();
        }
        myGame.switchTurn();
        console.log(myGame.getActivePlayer().name + '\'s turn ...');
      }
    }
  });

  /**
   * Exit game
   */
  function done(msg) {
    if(msg) console.log(msg);
    process.exit();
  }

  /**
   * Checks if given position is valid
   * @param {String|NUmber} position Position on the board
   * @return {Boolean}
   */
  function isValidPosition(position) {
    if(POSITIONS.indexOf(Number(position)) === -1) {
      console.log('Invalid postion. Expected number between 1 and 9');
      return false;
    }
    return true;
  }
})();