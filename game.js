(function() {
  'use strict';
  
  var Board = require('./board');

  module.exports = function game() {
    var board = null;
    var player1 = {
      name: 'Human',
      marker: 'x'
    };
    var player2 = {
      name: 'Computer',
      marker: 'o'
    };

    var activePlayer;
    var winner = null;
    var lastMarkedPosition = null;
    var availableMoves = [];

    return {
      start: start,
      getActivePlayer: getActivePlayer,
      getWinner: getWinner,
      move: move,
      isValidMove: isValidMove,
      switchTurn: switchTurn,
      pickComputerMove: pickComputerMove,
      isOver: isOver
    };

    /////

    /**
     * Initialize board and set active player
     */
    function start() {
      board = new Board();
      activePlayer = player1;
      availableMoves = Object.assign(availableMoves, board.positions());

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
     * Returns true if position is a valid board position  and unmarked
     */
    function isValidMove(position) {
      return board.isValidPosition(position) && isUnmarkedPosition(position);
    }

    /**
     * Mark position on board for given player
     */
    function move(position, player) {
      board.mark(position, player.marker);
      lastMarkedPosition = position;
      availableMoves.splice(availableMoves.indexOf(position), 1);
    }

    /**
     * Switch player turn
     */
    function switchTurn() {
      activePlayer = (activePlayer === player1) ? player2 : player1;
    }

    /**
     * Pick valid move for Computer player. This player
     * should always play valid moves
     */
    function pickComputerMove() {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
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

    /**
     * Returns true if position is unmarked
     */
    function isUnmarkedPosition(position) {
      if(availableMoves.indexOf(position) === -1) {
        console.log('Position already marked. Try again');
        return false;
      }
      return true;
    }

  }
})();
