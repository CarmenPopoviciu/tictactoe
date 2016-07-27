#! /usr/bin/env node

(function() {
  'use strict';
  
  var game = require('./game');

  var myGame = game(),
      activePlayer = null,
      winner = null;
  myGame.start();

  /////

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (input) {
    if (input === 'quit\n') done('Quitting... Bye bye o/');
    
    input = Number(input);

    if(myGame.isValidMove(input)) {
      // human player's move
      playTurn(input, function() {
        // computer's move
        switchTurn();
        process.stdin.pause();
        var position = myGame.pickComputerMove();
        console.log(position); 
        playTurn(position, switchTurn);
        process.stdin.resume();
      });
    }
  });

  /**
   * Player's move
   */
  function playTurn(position, callbackFn) {
    activePlayer = myGame.getActivePlayer();

    myGame.move(position, activePlayer);
    if(myGame.isOver()) {
      winner = myGame.getWinner();
      var msg = 'Game over! ' + (winner ?  'Winner is ' + winner.name : 'Draw. Nobody won :('); 
      console.log(msg);
      done();
    } else if(callbackFn){
      callbackFn();
    }
  }

  /**
   * Switch player turns
   */
  function switchTurn() {
    myGame.switchTurn();
    console.log(myGame.getActivePlayer().name + '\'s turn ...');
  }

  /**
   * Exit game
   */
  function done(msg) {
    if(msg) console.log(msg);
    process.exit();
  }

})();