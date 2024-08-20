import express from "express";

import type { BoardRequest } from "./board-request";
import {Board, Winner} from "./board";

/** Congrats, you found the server code. 
 * 
 * Your exercise is:
 * 1. Make sure the server responds
 * 2. Make the server detect if there is a winner.
 * 3. Make the server make a somewhat intelligent move
 * 
 * 4. Bonus. Would be nice if the UI worked too.
 */


export class Server {
   start() {
    const app = express();
    const port = 8080;

    
    app.post("/board", (req, res) => {
      console.log("body: " + JSON.stringify(req.body));
      const playingBoard = req.body as BoardRequest;
      const board = new Board(playingBoard.board);

      const currentWinner = board.getWinner();
      if (currentWinner != Winner.no_winner){
        const resp = {winner: board.getWinner(), board: board.getBoard()};
        return resp;
      }else{
         board.makeMove();

        const resp = {winner: board.getWinner(), board: board.getBoard()};
        
        return resp;
      }
    });

    app.listen(port, () => {
      console.log(`Server is ready to play qlik-tac-toe ${port}`)
    })
  }
}
