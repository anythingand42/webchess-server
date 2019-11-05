class Checkers {
    private readonly board: {[key: string]: { type: string, color: string } };
    private turn: string;
    private nextTurn: string;
    private readonly validPieces: Set<string> = new Set(["wm", "wk", "bm", "bk"]);
    private takenPiecesIds: Set<string> = new Set();
    constructor() {
        this.board = {};
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                this.board[`${i}${j}`] = null;
            }
        }
        this.turn = "w";
        this.nextTurn = "b";
    }

    public getTakenPiecesIds(): Set<string>  {
        return this.takenPiecesIds;
    }

    private isPieceValid(piece: string): boolean {
        return !!this.validPieces.has(piece);
    }

    private isIdValid(id: string): boolean {
        if(this.board[id] === undefined) return false;
        const line: number = Number(id[0]);
        const column: number = Number(id[1]);
        return line % 2 !== column % 2;
    }


    public setTurn(turn: string) {
        if(turn === "w") {
            this.turn = "w";
            this.nextTurn = "b";
            return;
        }
        if(turn === "b") {
            this.turn = "b";
            this.nextTurn = "w";
            return;
        }
        throw new Error("setTurn: invalid turn");
    }

    public setStartPosition(): void {
        for(let i = 0; i < 3; i++) {
            if(i % 2 === 0) {
                for(let j = 1; j < 8; j += 2) {
                    this.board[`${i}${j}`] = {
                        type: "m",
                        color: "b"
                    };
                }
            } else {
                for(let j = 0; j < 8; j += 2) {
                    this.board[`${i}${j}`] = {
                        type: "m",
                        color: "b"
                    };
                }
            }
        }
        for(let i = 5; i < 8; i++) {
            if(i % 2 === 0) {
                for(let j = 1; j < 8; j += 2) {
                    this.board[`${i}${j}`] = {
                        type: "m",
                        color: "w"
                    };
                }
            } else {
                for(let j = 0; j < 8; j += 2) {
                    this.board[`${i}${j}`] = {
                        type: "m",
                        color: "w"
                    };
                }
            }
        }
    }

    public ascii(): string {
        let boardPicture = "   ";
        for(let i = 0; i < 8; i++) {
            boardPicture += `${i}   `;
        }
        boardPicture += "\n\n";
        for(let i = 0; i < 8; i++) {
            boardPicture += `${i}  `;
            for(let j = 0; j < 8; j++) {
                const piece = this.board[`${i}${j}`];
                boardPicture += piece ? piece.color + piece.type : "--";
                boardPicture += "  ";
            }
            boardPicture += "\n\n";
        }
        return boardPicture;
    }

    public getPiece(id: string): string {
        if(!this.isIdValid(id)) throw new Error("getPiece: invalid id");
        return this.board[id] ? this.board[id].color + this.board[id].type : null;
    }

    public getTurn(): string {
        return this.turn;
    }

    private getTakingMoveForMenInDir(
        lineDir: number,
        columnDir: number,
        id: string
    ): {idTo: string, takenPieceId: string } {
        const line: number = Number(id[0]);
        const column: number = Number(id[1]);
        let checkedId = `${line+lineDir}${column+columnDir}`;
        if(this.board[checkedId]
            && this.board[checkedId].color === this.nextTurn
            && !this.takenPiecesIds.has(checkedId)
        ) {
            const nextLine = Number(checkedId[0]);
            const nextColumn = Number(checkedId[1]);
            let nextCheckedId = `${nextLine+lineDir}${nextColumn+columnDir}`;
            if(this.board[nextCheckedId] === null) return {
                idTo: nextCheckedId,
                takenPieceId: checkedId
            };
        } else return null;
    }

    private getAllTakingMovesForMen(id: string): Array<{idTo: string, takenPieceId: string}> {
        const moves: Array<{idTo: string, takenPieceId: string}> = [];
        let takingMove;
        takingMove = this.getTakingMoveForMenInDir(-1, -1, id);
        if(takingMove) moves.push(takingMove);
        takingMove = this.getTakingMoveForMenInDir(-1, 1, id);
        if(takingMove) moves.push(takingMove);
        takingMove = this.getTakingMoveForMenInDir(1, -1, id);
        if(takingMove) moves.push(takingMove);
        takingMove = this.getTakingMoveForMenInDir(1, 1, id);
        if(takingMove) moves.push(takingMove);
        return moves.length > 0 ? moves : null;
    }

    private getSimpleMoveForMenInDir(
        lineDir: number,
        columnDir: number,
        id: string
    ): {idTo: string} {
        const line: number = Number(id[0]);
        const column: number = Number(id[1]);
        let checkedId = `${line+lineDir}${column+columnDir}`;
        if(this.board[checkedId] === null &&
            ((this.turn === "w" && lineDir === -1)
            ||
            (this.turn === "b" && lineDir === 1)) ) {
            return {idTo: checkedId};
        } else return null;
    }

    private getAllSimpleMovesForMen(id: string): Array<{idTo: string}> {
        const moves: Array<{idTo: string}> = [];
        let simpleMove;
        simpleMove = this.getSimpleMoveForMenInDir(-1, -1, id);
        if(simpleMove) moves.push(simpleMove);
        simpleMove = this.getSimpleMoveForMenInDir(-1, 1, id);
        if(simpleMove) moves.push(simpleMove);
        simpleMove = this.getSimpleMoveForMenInDir(1, -1, id);
        if(simpleMove) moves.push(simpleMove);
        simpleMove = this.getSimpleMoveForMenInDir(1, 1, id);
        if(simpleMove) moves.push(simpleMove);
        return moves.length > 0 ? moves : null;
    }

    private getMovesForMen( id: string ): Array<{idTo: string, takenPieceId?: string}> {
        let moves: Array<{idTo: string, takenPieceId?: string}>;
        if(this.canTake()) {
            moves = this.getAllTakingMovesForMen(id);
        } else {
            moves = this.getAllSimpleMovesForMen(id);
        }
        return moves;
    }

    private getSimpleMovesInDirForKing(
        lineDir: number,
        columnDir: number,
        id: string
    ): Array<{idTo: string}> {
        const line: number = Number(id[0]);
        const column: number = Number(id[1]);
        let checkedId = `${line + lineDir}${column + columnDir}`;
        const moves: Array<{idTo: string}> = [];
        for(let i: number = 2; this.board[checkedId] === null; i++) {
            moves.push({idTo: checkedId});
            checkedId = `${line + i*lineDir}${column + i*columnDir}`
        }
        return moves.length > 0 ? moves : null;
    }

    private getAllSimpleMovesForKing(id: string): Array<{idTo: string}> {
        let moves: Array<{idTo: string}> = [];
        let simpleMoves;
        simpleMoves = this.getSimpleMovesInDirForKing(-1, -1, id);
        if(simpleMoves) moves = moves.concat(simpleMoves);
        simpleMoves = this.getSimpleMovesInDirForKing(-1, 1, id);
        if(simpleMoves) moves = moves.concat(simpleMoves);
        simpleMoves = this.getSimpleMovesInDirForKing(1, -1, id);
        if(simpleMoves) moves = moves.concat(simpleMoves);
        simpleMoves = this.getSimpleMovesInDirForKing(1, 1, id);
        if(simpleMoves) moves = moves.concat(simpleMoves);
        return moves.length > 0 ? moves : null;
    }

    private getTakingMovesInDirForKing(
        lineDir: number,
        columnDir: number,
        id: string
    ): Array<{idTo: string, takenPieceId: string }> {
        const line: number = Number(id[0]);
        const column: number = Number(id[1]);
        let checkedId = `${line + lineDir}${column + columnDir}`;
        const moves: Array<{idTo: string, takenPieceId: string}> = [];
        for(let i: number = 2; this.isIdValid(checkedId); i++) {
            if(this.board[checkedId] && this.board[checkedId].color === this.turn) break;
            if(this.board[checkedId]
                && this.board[checkedId].color === this.nextTurn
                && !this.takenPiecesIds.has(checkedId)
            ) {
                const takenPieceId: string = checkedId;
                checkedId = `${line + i*lineDir}${column + i*columnDir}`;
                for(let j: number = i+1; this.board[checkedId] === null; j++) {
                    moves.push({idTo: checkedId, takenPieceId});
                    checkedId = `${line + j*lineDir}${column + j*columnDir}`;
                }
                break;
            }
            checkedId = `${line + i*lineDir}${column + i*columnDir}`;
        }
        return moves.length > 0 ? moves : null;
    }

    private getAllTakingMovesForKing(id: string, directions: Array<{line: number, column: number}>): Array<{idTo: string, takenPieceId: string}> {
        let moves: Array<{idTo: string, takenPieceId: string}> = [];
        let takingMoves;
        directions.forEach((dir) => {
            takingMoves = this.getTakingMovesInDirForKing(dir.line, dir.column, id);
            if(takingMoves) moves = moves.concat(takingMoves);
        });
        return moves.length > 0 ? moves : null;
    }

    private getValidTakingMovesInDirForKing(
        lineDir: number,
        columnDir: number,
        id: string
    ): Array<{idTo: string, takenPieceId: string }> {
        const line: number = Number(id[0]);
        const column: number = Number(id[1]);
        let checkedId = `${line + lineDir}${column + columnDir}`;
        let moves: Array<{idTo: string, takenPieceId: string}> = [];
        for(let i: number = 2; this.isIdValid(checkedId); i++) {
            if(this.board[checkedId] && this.board[checkedId].color === this.turn) break;
            if(this.board[checkedId]
                && this.board[checkedId].color === this.nextTurn
                && !this.takenPiecesIds.has(checkedId)
            ) {
                const takenPieceId: string = checkedId;
                checkedId = `${line + i*lineDir}${column + i*columnDir}`;
                const dirs = [
                    {line: -1, column: -1},
                    {line: -1, column: 1},
                    {line: 1, column: -1},
                    {line: 1, column: 1}
                ];
                const checkDirs = dirs.filter((dir) => dir.line !== -lineDir || dir.column !== -columnDir);
                let continueTakingMoves = [];
                for(let j: number = i+1; this.board[checkedId] === null; j++) {
                    let nextTakingMoves = this.getAllTakingMovesForKing(checkedId, checkDirs);
                    if(nextTakingMoves) {
                        continueTakingMoves.push({idTo: checkedId, takenPieceId});
                    }
                    checkedId = `${line + j*lineDir}${column + j*columnDir}`;
                }
                if(continueTakingMoves.length > 0) {
                    moves = continueTakingMoves;
                } else {
                    checkedId = `${line + i*lineDir}${column + i*columnDir}`;
                    for(let j: number = i+1; this.board[checkedId] === null; j++) {
                        moves.push({idTo: checkedId, takenPieceId});
                        checkedId = `${line + j*lineDir}${column + j*columnDir}`;
                    }
                }
                break;
            }
            checkedId = `${line + i*lineDir}${column + i*columnDir}`;
        }
        return moves.length > 0 ? moves : null;
    }

    private getAllValidTakingMovesForKing(id: string, directions: Array<{line: number, column: number}>): Array<{idTo: string, takenPieceId: string}> {
        let moves: Array<{idTo: string, takenPieceId: string}> = [];
        let takingMoves;
        directions.forEach((dir) => {
            takingMoves = this.getValidTakingMovesInDirForKing(dir.line, dir.column, id);
            if(takingMoves) moves = moves.concat(takingMoves);
        });
        return moves && moves.length > 0 ? moves : null;
    }

    private getMovesForKing( id: string ): Array<{idTo: string, takenPieceId?: string}> {
        let moves: Array<{idTo: string, takenPieceId?: string}>;
        if(this.canTake()) {
            moves = this.getAllValidTakingMovesForKing(id,[
                {line: -1, column: -1},
                {line: -1, column: 1},
                {line: 1, column: -1},
                {line: 1, column: 1}
            ]);
        } else {
            moves = this.getAllSimpleMovesForKing(id);
        }
        return moves;
    }

    private canTake(): boolean {
        for(const id in this.board) {
            if(this.board[id] && this.board[id].color === this.turn) {
                if(this.canTakeFrom(id)) {
                    return true;
                }
            }
        }
        return false;
    }

    private canTakeFrom(id): boolean {
        const piece: {type: string, color: string} = this.board[id];
        if(piece && piece.color === this.turn) {
            if(piece.type === "m") {
                if(this.getAllTakingMovesForMen(id)) return true;
            }
            if(piece.type === "k") {
                let takingMoves = this.getAllTakingMovesForKing(id,[
                    {line: -1, column: -1},
                    {line: -1, column: 1},
                    {line: 1, column: -1},
                    {line: 1, column: 1}
                ]);
                if(takingMoves) return true;
            }
        }
        return false;
    }


    public getMoves(id: string): Array<{idTo: string, takenPieceId?: string}> {
        if(!this.isIdValid(id)) throw new Error("getMoves: invalid id");
        const piece: {type: string, color: string} = this.board[id];
        if(piece === null || piece.color !== this.turn) return null;
        let moves: Array<{idTo: string, takenPieceId?: string}> = null;
        if(this.board[id].type === "m") moves = this.getMovesForMen(id);
        if(this.board[id].type === "k") moves = this.getMovesForKing(id);
        return moves;
    }

    public eraseBoard(): void {
        for(const key in this.board) {
            this.board[key] = null;
        }
    }

    public makeMove(idFrom: string, idTo: string): {
        isMoveCorrect: boolean,
        isMoveOver?: boolean
    } {
        if(!this.isIdValid(idFrom)) throw new Error("makeMove: invalid idFrom");
        if(!this.isIdValid(idTo)) throw new Error("makeMove: invalid idTo");
        const piece: {type: string, color: string} = this.board[idFrom];
        if(piece === null || piece.color !== this.turn) return { isMoveCorrect: false };
        const validMoves = this.getMoves(idFrom);
        if(!validMoves) return { isMoveCorrect: false };
        const move: {idTo: string, takenPieceId?: string} = validMoves.find((move) => {
            return move.idTo === idTo
        });
        if(!move) return { isMoveCorrect: false };
        this._putPiece(idTo, this.board[idFrom]);
        this.removePiece(idFrom);
        if(!move.takenPieceId) {
            this.setTurn(this.nextTurn);
            this.takenPiecesIds.clear();
            return {isMoveCorrect: true, isMoveOver: true};
        }
        this.takenPiecesIds.add(move.takenPieceId);
        if(!this.canTakeFrom(idTo)) {
            this.takenPiecesIds.forEach((id: string) => {
                this.removePiece(id);
            });
            this.takenPiecesIds.clear();
            this.setTurn(this.nextTurn);
            return {isMoveCorrect: true, isMoveOver: true};
        }
        return {isMoveCorrect: true, isMoveOver: false};
    }

    private _putPiece(id, piece: {color: string, type: string}) {
        if(!this.isIdValid(id)) throw new Error("_putPiece: invalid id");
        if( (piece.color === "w" && id[0] === "0") || (piece.color === "b" && id[0] === "7")) {
            piece.type = "k";
        }
        this.board[id] = piece;
    }

    public putPiece(id: string, piece: string): void {
        if(!this.isIdValid(id)) throw new Error("putPiece: invalid id");
        if(!this.isPieceValid(piece)) throw new Error("putPiece: invalid piece");
        this._putPiece(id, {
            color: piece[0],
            type: piece[1],
        });
    }

    public removePiece(id: string) {
        if(!this.isIdValid(id)) throw new Error("removePiece: invalid id");
        this.board[id] = null;
    }
}

export default Checkers;

// const game: Checkers = new Checkers();
// game.eraseBoard();
// game.putPiece("61", "wm");
// game.putPiece("41", "wm");
// game.putPiece("32", "wm");
// game.putPiece("34", "wm");
// game.putPiece("54", "wm");
// game.putPiece("76", "wm");
// game.putPiece("56", "bm");
// game.putPiece("36", "bm");
// game.putPiece("16", "bm");
// game.putPiece("14", "bm");
// game.putPiece("12", "bm");
// game.putPiece("01", "bm");
// console.log(game.ascii());
// console.log(game.makeMove("32", "23"));
// console.log(game.ascii());
// console.log(game.makeMove("14", "32"));
// console.log(game.ascii());
// console.log(game.makeMove("32", "50"));
// console.log(game.ascii());
// console.log(game.makeMove("50", "72"));
// console.log(game.ascii());
// console.log(game.makeMove("72", "45"));
// console.log(game.ascii());
// console.log(game.makeMove("76", "67"));
// console.log(game.ascii());
// console.log(game.makeMove("45", "23"));
// console.log(game.ascii());
// console.log(game.makeMove("67", "45"));
// console.log(game.ascii());
// console.log(game.makeMove("45", "27"));
// console.log(game.ascii());
// console.log(game.makeMove("27", "05"));
// console.log(game.ascii());
// console.log(game.makeMove("05", "50"));
// console.log(game.ascii());

// const game: Checkers = new Checkers();
// game.eraseBoard();
// game.putPiece("74", "wk");
// game.putPiece("54", "wk");
// game.putPiece("34", "wk");
// game.putPiece("05", "bk");
// game.setTurn("b");
// console.log(game.ascii());
// console.log(game.makeMove("05", "50"));
// console.log(game.ascii());
// console.log(game.makeMove("34", "52"));
// console.log(game.ascii());
// console.log(game.makeMove("50", "05"));
// console.log(game.ascii());
// console.log(game.makeMove("54", "32"));
// console.log(game.ascii());
// console.log(game.makeMove("05", "41"));
// console.log(game.ascii());
// console.log(game.makeMove("05", "41"));
// console.log(game.ascii());

// const game: Checkers = new Checkers();
// game.eraseBoard();
// game.putPiece("70", "wk");
// game.putPiece("41", "bk");
// game.putPiece("63", "bk");
// game.putPiece("61", "bk");
// game.putPiece("36", "bk");
// console.log(game.ascii());
// console.log(game.makeMove("70", "52"));
// console.log(game.ascii());
// console.log(game.getMoves("52"));
