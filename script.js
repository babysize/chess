let whitePieces = {
    rookLeft    : {column:0, row:7, type:'rook', color : 'w', src:'pieces/rook_white.png'},
    rookRigth   : {column:7, row:7, type:'rook', color : 'w', src:'pieces/rook_white.png'},
    bishopLeft  : {column:2, row:7, type:'bishop', color : 'w', src:'pieces/bishop_white.png'},
    bishopRigth : {column:5, row:7, type:'bishop', color : 'w', src:'pieces/bishop_white.png'},
    queen       : {column:3, row:7, type:'queen', color : 'w', src:'pieces/queen_white.png'},
    king        : {column:4, row:7, type:'king', color : 'w', src:'pieces/king_white.png'},
    knightLeft  : {column:1, row:7, type:'knight', color : 'w', src:'pieces/knight_white.png'},
    knigthRigth : {column:6, row:7, type:'knight', color : 'w', src:'pieces/knight_white.png'},
    pawnFirst   : {column:0, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnSecond  : {column:1, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnThird   : {column:2, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnFouth   : {column:3, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnFifth   : {column:4, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnSixth   : {column:5, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnSeventh : {column:6, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'},
    pawnEighth  : {column:7, row:6, type:'pawn', color : 'w', src:'pieces/pawn_white.png'}
}

let blackPieces = {
    rookLeft    : {column:0, row:0, type:'rook', color : 'b', src:'pieces/rook_black.png'},
    rookRigth   : {column:7, row:0, type:'rook', color : 'b', src:'pieces/rook_black.png'},
    bishopLeft  : {column:2, row:0, type:'bishop', color : 'b', src:'pieces/bishop_black.png'},
    bishopRigth : {column:5, row:0, type:'bishop', color : 'b', src:'pieces/bishop_black.png'},
    queen       : {column:3, row:0, type:'queen', color : 'b', src:'pieces/queen_black.png'},
    king        : {column:4, row:0, type:'king', color : 'b', src:'pieces/king_black.png'},
    knightLeft  : {column:1, row:0, type:'knight', color : 'b', src:'pieces/knight_black.png'},
    knigthRigth : {column:6, row:0, type:'knight', color : 'b', src:'pieces/knight_black.png'},
    pawnFirst   : {column:0, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnSecond  : {column:1, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnThird   : {column:2, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnFouth   : {column:3, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnFifth   : {column:4, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnSixth   : {column:5, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnSeventh : {column:6, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'},
    pawnEighth  : {column:7, row:1, type:'pawn', color : 'b', src:'pieces/pawn_black.png'}
}

let cheesBoard = document.getElementsByClassName("board")[0];

createBoard(cheesBoard)

addPiecesToBoard(cheesBoard, whitePieces)
addPiecesToBoard(cheesBoard, blackPieces)

let moveColor = "b"
    
//создание шахматной доски
function createBoard(board) {
    for (let columnIndex = 0; columnIndex < 8; columnIndex++){
        let column = document.createElement("div");
        column.classList = "column";
    
        for (let row = 0; row < 8; row++) {
            let squares = document.createElement("div");
    
            squares.setAttribute('ondrop','drop(event)');
            squares.setAttribute('ondragover','onDragOver(event)');
            squares.setAttribute('app_y', row);
            squares.setAttribute('app_x',columnIndex);
    
            if ((columnIndex+row) % 2 == 0) {
                squares.classList = "white";
            }else{
                squares.classList = "black";
            }
    
            column.append(squares);
        }
        board.append(column);
        }
}

//добавление фигур на доску
function addPiecesToBoard(board, pieces) {
    for (let piece in pieces) {
        let img = document.createElement('img');

        img.src =  pieces[piece].src;
        img.id = piece + pieces[piece].color;

        img.setAttribute('ondragstart','onDragStart(event)');

        let position = board
                        .children[pieces[piece].column]
                        .children[pieces[piece].row];

        position.append(img);
    }
}  

//что происходит с элементом при начале перетаскивания
function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  }

//функция для принятия перетаскиваемого элемента 
function onDragOver(event) {
    event.preventDefault();
}

//взаимодействие с элементом на который происходит перетаскивание
function drop(event) {
    event.preventDefault();

    let idPiece = event.dataTransfer.getData("text/plain")
    
    let colorPiece = event.dataTransfer.getData("text/plain").slice(-1)
    if(colorPiece == moveColor)
        return

    if (colorPiece == 'w') {
        piece = whitePieces[event.dataTransfer.getData("text/plain").slice(0,-1)]
    }else{
        piece = blackPieces[event.dataTransfer.getData("text/plain").slice(0,-1)]
    }
    

    let targetSquare = event.target
    let targetX, targetY
    if (targetSquare.id != '') {
        let parent = targetSquare.parentNode;
        targetX = parent.getAttribute('app_x');
        targetY = parent.getAttribute('app_y');
    }else {
        targetX = targetSquare.getAttribute('app_x');
        targetY = targetSquare.getAttribute('app_y');
    }

    definitionFigure(targetSquare, targetX, targetY, piece, idPiece)

    moveColor = colorPiece
}

//определение фигуры
function definitionFigure(square,x, y, piece, idPiece){
    switch (piece.type) {
        case "rook":  
            if (moveRook(piece, x, y))
                checkFinishCage(square, x, y, piece, idPiece)
            break;

        case "knight":
            if(moveKnight(piece, x, y))
                checkFinishCage(square, x, y, piece, idPiece)
            break;

        case "queen":
            if(moveQueen(piece, x, y))
                checkFinishCage(square, x, y, piece, idPiece)
            break

        case "pawn":
            if (movePawn(piece, x, y, square))
                checkFinishCage(square, x, y, piece, idPiece)
            break;

        case "bishop":
            if(moveBishop(piece, x, y))
                checkFinishCage(square, x, y, piece, idPiece)
            break

        case "king":
            if(moveKing(piece, x, y))
                checkFinishCage(square, x, y, piece, idPiece)
            break

        default:
            break;
    }
}

//проверка что на пути фигуры не встретились фигуры
function isCageEmpty(x, y) {
    for (const key in whitePieces) {
        if(whitePieces[key].column == x && whitePieces[key].row == y)
            return false
    }
    for (const key in blackPieces) {
        if(blackPieces[key].column == x && blackPieces[key].row == y)
            return false
    }
    return true
}

function moveRook(piece, endX, endY) {
    if (piece.column != endX && piece.row != endY) {
        return false
    }

    if (piece.column == endX) {
        for (let i = Math.min(piece.row, endY) + 1; i <= Math.max(piece.row, endY) - 1; i++) {
            if (!isCageEmpty(piece.column, i)) return false
        }
    }

    if (piece.row == endY) {
        for (let i = Math.min(piece.column, endX) + 1; i <= Math.max(piece.column, endX) - 1; i++) {
            if (!isCageEmpty(i, piece.row)) return false
        }
    }
    return true
}

function moveKnight(piece, endX, endY){
    if (Math.abs(piece.column-endX) == 2 
        && Math.abs(piece.row-endY) == 1)
        return true

    if(Math.abs(piece.column-endX) == 1 
        && Math.abs(piece.row-endY) == 2){
            return true}

    return false
}

function moveQueen(piece, endX, endY){
    if (piece.column == endX) {
        for (let i = Math.min(piece.row, endY) + 1; i <= Math.max(piece.row, endY) - 1; i++) {
            if (!isCageEmpty(piece.column, i)) return false
        }
        return true
    }
    
    if (piece.row == endY) {
        for (let i = Math.min(piece.column, endX) + 1; i <= Math.max(piece.column, endX) - 1; i++) {
            if (!isCageEmpty(i, piece.row)) return false
        }
        return true
    }

    if (Math.abs(piece.column - endX) == Math.abs(piece.row - endY)) {
        let countX = piece.column < endX ? 1 : -1
        let countY = piece.row < endY ? 1 : -1
        
        for (let i = 1; i < Math.abs(piece.column - endX); i++) {
            if(!isCageEmpty(piece.column + i*countX, piece.row + i*countY)) 
                return false
        }
        return true
    }
    
    return false
}

function movePawn(piece, endX, endY, square){
    endY = Number(endY)
    endX=Number(endX)

    if(square.id != ''){
        if (piece.color == 'w' && Math.abs(piece.column-endX) == 1 
            && piece.row == endY+1
        || piece.color == 'b' && Math.abs(piece.column-endX) == 1 
            && piece.row == endY-1) {
            return true
        }
    }else if(piece.color == 'w' && piece.column == endX && piece.row == endY+1 
            || piece.color == 'b' && piece.column == endX && piece.row == endY-1){
                return true
    }else if(piece.color == 'w' && piece.column == endX 
            && piece.row == 6 && piece.row == endY+2){
                return isCageEmpty(piece.column, piece.row-1)
    }else if(piece.color == 'b' && piece.column == endX 
            && piece.row == 1 && piece.row == endY-2){
                return isCageEmpty(piece.column, piece.row+1)
    }

    return false
}

function moveBishop(piece, endX, endY){
    if (Math.abs(piece.column - endX) == Math.abs(piece.row - endY)) {
        let countX = piece.column < endX ? 1 : -1
        let countY = piece.row < endY ? 1 : -1

        for (let i = 1; i < Math.abs(piece.column - endX); i++) {
            if(!isCageEmpty(piece.column + i*countX, piece.row + i*countY)) 
                return false
        }
        return true
    }
    
    return false
}

function moveKing(piece, endX, endY){
    if(Math.abs(piece.column - endX) == Math.abs(piece.row - endY)
        && Math.abs(piece.column - endX) == 1
        || piece.column == endX && Math.abs(piece.row - endY) == 1
        || piece.row == endY && Math.abs(piece.column - endX) == 1)
        return true
    else
        return false
}

//изменение наполнения конечной точки пути фигуры
function checkFinishCage(square, x, y, piece, idPiece) {
    if (square.id != '') {
        if(piece.color == square.id.slice(-1)) return
        square = square.parentNode
        square.removeChild(square.firstChild)
        if (square.id.slice(-1) == 'b') {
            delete whitePieces[square.id.slice(0,-1)]
        } else {
            delete blackPieces[square.id.slice(0,-1)]
        }
    }
    piece.column = Number(x)
    piece.row = Number(y)
    square.appendChild(document.getElementById(idPiece))
}