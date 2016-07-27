(function() {
  'use strict';

  var POSITIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function Board() {
    this.board =  [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
  }

  /**
   * Returns the valid positions array
   */
  Board.prototype.positions = function() {
    return POSITIONS;
  }

  /**
   * Checks if given position is valid
   * @param {Number} position Position on the board
   * @return {Boolean}
   */
  Board.prototype.isValidPosition = function(position) {
    if(POSITIONS.indexOf(position) === -1) {
      console.log('Invalid postion. Expected number between 1 and 9');
      return false;
    }
    return true;
  }

  /**
   * Marks given position on the board with "o" or "x", based on which player is making the move
   * 
   * @param {Number} position The position on the board
   * @param {Object} player The player making the move
   */
  Board.prototype.mark = function(position, player) {
    if(!this.isValidPosition(position)) return;
    var index = positionToIndex(position),
        i = index[0],
        j = index[1];
    if(this.board[i][j]) {
      console.log('Position already marked. Try again');
      return;
    }
    this.board[i][j] = player;
  }

  /**
   * Returns true if row is completed by a player
   */
  Board.prototype.completeRow = function(position) {
    var index = positionToIndex(position),
        i = index[0],
        j = index[1],
        row = this.row(i);

    for(var k=0; k<row.length; k++) {
      if(row[k] !== this.board[i][j]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if column is completed by a player
   */
  Board.prototype.completeColumn = function(position) {
    var index = positionToIndex(position),
        i = index[0],
        j = index[1],
        column = this.column(j);

    for(var k=0; k<column.length; k++) {
      if(column[k] !== this.board[i][j]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if first diagonal is completed by a player
   */
  Board.prototype.completeFirstDiagonal = function(position) {
    // if(!isOnDiagonal(position)) return;
    var index = positionToIndex(position),
        i = index[0],
        j = index[1],
        firstDiagonal = this.firstDiagonal();

        for(var k=0; k<firstDiagonal.length; k++) {
          if(firstDiagonal[k] !== this.board[i][j]) {
            return false;
          }
        }
        return true;
  }

  /**
   * Returns true if first diagonal is completed by a player
   */
  Board.prototype.completeSecondDiagonal = function(position) {
    // if(!isOnDiagonal(position)) return;
    var index = positionToIndex(position),
        i = index[0],
        j = index[1],
        secondDiagonal = this.secondDiagonal();

      for(var k=0; k<secondDiagonal.length; k++) {
        if(secondDiagonal[k] !== this.board[i][j]) {
          return false;
        }
      }
      return true;
  }

  Board.prototype.completed = function() {
    for(var i=0; i<this.board[0].length; i++) {
      if(this.board[i].indexOf(null) !== -1) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns elements of a row given its index 
   */
  Board.prototype.row = function(rowIndex) {
    var row = [];
    for(var j=0; j<this.board[0].length; j++) {
      row.push(this.board[rowIndex][j]);
    }
    return row;
  };

  /**
   * Returns elements of a column given its index 
   */
  Board.prototype.column = function(columnIndex) {
    var column = [];
    for(var i=0; i<this.board[0].length; i++) {
      column.push(this.board[i][columnIndex]);
    }
    return column;
  };

  /**
   * Returns elements of the first diagonal
   */
  Board.prototype.firstDiagonal = function() {
    var diagonal = [];
    for(var i=0; i<this.board[0].length; i++) {
      diagonal.push(this.board[i][i]);
    }
    return diagonal;
  };

  /**
   * Returns elements of the second diagonal
   */
  Board.prototype.secondDiagonal = function() {
    var diagonal = [];
    for(var i=0; i<this.board[0].length; i++) {
      diagonal.push(this.board[this.board[0].length-1-i][i]);
    }
    return diagonal;
  }

  /**
   * Convert board position to matrix indexes [i,j]
   */
  function positionToIndex(position) {
    switch(position) {
      case 1:
        return [0,0];
      case 2:
        return [0,1];
      case 3:
        return [0,2];
      case 4:
        return [1,0];
      case 5:
        return [1,1];
      case 6:
        return [1,2];
      case 7:
        return [2,0];
      case 8:
        return [2,1];
      case 9:
        return [2,2];
    }
  }

  module.exports = Board;
})();