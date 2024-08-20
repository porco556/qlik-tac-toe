export enum Winner{
	human=1,
	computer=0,
	no_winner=-1
}

export enum Player{
	human=1,
	computer=0,
	not_played =-1
}


export class Board{
	private board: number[];
	private static FOO = [
		[0,1,2],
		[0,3,6],
		[0,4,8],
		[1,4,7],
		[2,5,8],
		[2,4,6],
		[3,4,5],
		[6,7,8]
	]

	public constructor(board: number[]){
		this.board = board;
		if (board){
			console.log(board.join(","));
		}
	}

	public getBoard(){
		return this.board;
	}

	public getWinner(): Winner{
		return Winner.no_winner;
	}

	public makeMove(){
		const availableSquares = [];
		for (let i = 0; i < this.board.length; i++){
			if (this.board[i] == -1){
				availableSquares.push(i);
			}
		}
		const square =  availableSquares[Math.floor(Math.random() * availableSquares.length)];
		this.board[square] = Player.computer;
	}
}