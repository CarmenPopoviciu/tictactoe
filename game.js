(function() {
  'use strict';
  
  var Board = require('./board');

  module.exports = function game() {
    var board = null;
    var player1 = {
      name: 'Player1',
      marker: 'x'
    };
    var player2 = {
      name: 'Player2',
      marker: 'o'
    };
    var activePlayer;
    var winner = null;
    var lastMarkedPosition = null;

    return {
      start: start,
      getActivePlayer: getActivePlayer,
      getWinner: getWinner,
      move: move,
      switchTurn: switchTurn,
      isOver: isOver
    };

    /////

    /**
     * Initialize board and set active player
     */
    function start() {
      board = new Board();
      activePlayer = player1;

      console.log('Starting tic-tac-toe game');
      console.log(activePlayer.name + '\'s turn...');
    }

    /**
     * Returns the active player
     */
    function getActivePlayer() {
      return activePlayer;
    }

    /**
     * Returns the game winner
     */
    function getWinner() {
      return winner;
    }

    /**
     * Mark position on board for given player
     */
    function move(position, player) {
      lastMarkedPosition = position;
      return board.mark(position, player.marker)
    }

    /**
     * Switch player turn
     */
    function switchTurn() {
      activePlayer = (activePlayer === player1) ? player2 : player1;
    }

    /**
     * Returns whether the game is over or not
     */
    function isOver(position) {
      var position = lastMarkedPosition;
      if(board.completeRow(position) || board.completeColumn(position) || board.completeFirstDiagonal(position) || board.completeSecondDiagonal(position)) {
        winner = activePlayer;
        return true;
      }
      if(board.completed()) {
        return true;
      }
      return false;
    }
  }
})();
