/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH })); //creates the array that holds the values of the elements on the table
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  const top = document.createElement("tr"); //creates a new element in the table
  top.setAttribute("id", "column-top"); //sets the new tr to have the id column-top
  top.addEventListener("click", handleClick); //adds addeventlistener to the top row 

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x); //setting each element in the row the id of where the loop count was at
    top.append(headCell); //for loop going through creating elements to put into tds and adding them to the top row
  }
  htmlBoard.append(top); //adding the top row with the new elements added to the html board

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //looping through to create the multiple rows aka columns
    const row = document.createElement("tr"); //varibale that adds more rows to the board
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //creates elements in the rows
      cell.setAttribute("id", `${y}-${x}`); //sets each cell element id to the row and column count
      row.append(cell); //adds the new cell to the row
    }
    htmlBoard.append(row); // adds the new rows to the board on html
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) { //searches the column x that was clicked on and checks the last to first cells in that column to see where the next empty cell is
    if (!board[y][x]) { //take the location on the next level on the column(y) then checks if its null and if not then it should be undefined making it an empty cell
      return y; 
    }
  }
  return null;
}



/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div"); //creates the token
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`); //token id shows the player
  console.log(piece);
  piece.style.top = -50 * (y + 2);
  const spot = document.getElementById(`${y}-${x}`); //gets the location on the table of where to put the new token
  spot.append(piece) //add the piece div to the spots td location on the html
  console.log(spot);
 
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  console.log(currPlayer);
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x); //uses this function the find if there is a y cell available and if its not null the return because the value of y
  if (y === null) {
    return; 
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer; //sets the board spot to the current playwe
  console.log(board[y][x]);
  placeInTable(y, x); //calls the function that creates the token on the html

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if(board.every(row => row.every(cell => cell))){
  return endGame('tie!')
}
/*
if(board.every(function(row){
  return row.every(function(cell){
    return endGame('tie')
  })
}));
*/
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1){
    currPlayer = 2;
  } else{
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
