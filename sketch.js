var board = [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];
const X_OFFSET = 50;
const Y_OFFSET = 100;
const TILE_SIZE = 30;
const BOARD_X = TILE_SIZE * 10;
const BOARD_Y = TILE_SIZE * 20;
const SCREEN_X = BOARD_X + 200;
const SCREEN_Y = BOARD_Y + 150;
const MAX_LENGTH = 8;

var gameState = 2;
var font;

var score = 0;
var level = 0;
var linesCleared = 0;

var dropTime;
var totalTime = 0;
var fastDrop = false;

var piece;
var nextPiece;
var hold = 0;
var held = false;
var ghost;

var txt;
var name = '';

function loadFile(){
    loadStrings('highscores.txt', fileLoaded);
}
function fileLoaded(data){
    txt = data;
}

function setup(){ 
    loadFile();
    font = loadFont("Tetris.ttf");
    createCanvas(SCREEN_X, SCREEN_Y);
    piece = newPiece(int(random(1,8)));
    nextPiece = [int(random(1,8)), int(random(1,8)), int(random(1,8)), int(random(1,8)), int(random(1,8))];
    ghost = new Ghost(piece.tiles, TILE_SIZE); 
    textFont(font);
    textAlign(CENTER, CENTER);
    
}

function draw(){
    background(220);
    
    if (gameState == 0){//-----------------------------------------------start
        textAlign(CENTER, CENTER);
        textSize(80);
        fill(100);
        text("TETRIS", SCREEN_X/2, SCREEN_Y/4);

        totalTime += deltaTime;
        if (totalTime < 700){
            textSize(50);
            text("SPACE TO\nCONTINUE", SCREEN_X/2, SCREEN_Y*2/4)
        }else if (totalTime > 1000){
            totalTime = 0;
        }
        fill(150);
        textSize(30);
        text("MADE BY:\nANDERS TAI", SCREEN_X/2, SCREEN_Y*3/4)
    }
    else if (gameState == 1){//------------------------------------------game running
        textAlign(LEFT, CENTER);
        noStroke();
        fill(200);
        rect(X_OFFSET, Y_OFFSET, BOARD_X, BOARD_Y);
        textSize(40);
        fill(100);
        text("SCORE: "+ score, X_OFFSET, Y_OFFSET/2);
        checkLose();
        setDropSpeed();
        if (totalTime >= dropTime){
            totalTime = 0;
            var a = piece.moveDown(board);
            if (!a){
                place();
            }
        }else{
            totalTime+=deltaTime;   
        }
        clearLines();
        ghost.update(board);
        for (var a = 0; a < nextPiece.length; a++){
            showSidePiece(X_OFFSET + BOARD_X + 15, Y_OFFSET + 90*a, nextPiece[a], 30);
        }
        showSidePiece(X_OFFSET + BOARD_X + 15, Y_OFFSET + BOARD_Y - 60, hold, 30);
        ghost.show(X_OFFSET, Y_OFFSET, board);
        piece.show(X_OFFSET, Y_OFFSET);
        showBoard();
    }else if (gameState == 2){//---------------------------------------------end screen
        textAlign(CENTER, CENTER);
        textSize(60);
        fill(100);
        text("GAME OVER", SCREEN_X/2, SCREEN_Y/4);
        text("SCORE\n"+score, SCREEN_X/2, SCREEN_Y*2/4);
        textSize(40);
        totalTime += deltaTime;
        if (totalTime < 700){
            fill(150);
            textSize(50);
            text("SPACE TO\nCONTINUE", SCREEN_X/2, SCREEN_Y*3/4)
        }else if (totalTime > 1000){
            totalTime = 0;
        }
    }
}

function keyPressed(){
    if (gameState == 0){
        if (keyCode == 32){
            gameState = 1;
        }
    }else if (gameState == 1){
        if (keyCode == 40){
            fastDrop = true;
        }else if (keyCode == 37){//-----left arrow
            piece.moveLeft(board);
        }else if (keyCode == 39){//-----right arror
            piece.moveRight(board);
        }else if (keyCode == 38){//-----up arrow
            piece.rotateCW(board);
        }else if (keyCode == 17){//-----left control
            piece.rotateCCW(board);
        }else if (keyCode == 32){//-----space
            hardDrop();
        }else if (keyCode == 67 && !held){//-----c
            if (hold == 0){
                hold = piece.id;
                piece = newPiece(nextPiece[0]);
                nextPiece.shift();
                nextPiece.push(int(random(1,8)));
                ghost.tiles = piece.tiles;
            }else if (!held){
                temp = hold;
                hold = piece.id;
                piece = newPiece(temp);
                ghost.tiles = piece.tiles;
            }
            held = true;
        }
    }else if (gameState == 2){
        if (keyCode == 32){
            gameState = 0;
            board = [[0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0]];
            score = 0;
            level = 0;
            piece = newPiece(int(random(1,8)));
            ghost.tiles = piece.tiles;
            nextPiece = [int(random(1,8)), int(random(1,8)), int(random(1,8)), int(random(1,8)), int(random(1,8))];
        }
    }
}

function keyReleased(){
    if (keyCode == 40){
        fastDrop = false;
    }
}

function newPiece(n){
    switch(n){
        case 1:
            return new I(TILE_SIZE);
        case 2:
            return new O(TILE_SIZE);
        case 3:
            return new T(TILE_SIZE);
        case 4:
            return new J(TILE_SIZE);
        case 5:
            return new L(TILE_SIZE);
        case 6:
            return new S(TILE_SIZE);
        case 7:
            return new Z(TILE_SIZE);
    }
}

function showBoard(){
    /* 
    1 = I -- fill(80,145,250);
    2 = O -- fill(245,225,75);
    3 = T -- fill(220,75,245);
    4 = J -- fill(60,85,240);
    5 = L -- fill(240,170,60);
    6 = S -- fill(120,240,60);
    7 = Z -- fill(240,60,60);
    */
    for(var y = 0; y < board.length; y++){
        for (var x = 0; x < board[0].length; x++){
            switch(board[y][x]){
                case 1:
                    fill(80,145,250);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
                case 2:
                    fill(245,225,75);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
                case 3:
                    fill(220,75,245);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
                case 4:
                    fill(60,85,240);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
                case 5:
                    fill(240,170,60);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
                case 6:
                    fill(120,240,60);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
                case 7:
                    fill(240,60,60);
                    rect(X_OFFSET + x * TILE_SIZE, Y_OFFSET + y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    break;
            }
        }
    }
}

function setDropSpeed(){
    if (linesCleared < 10){
        dropTime = 1000;
    }else if (linesCleared < 20){
        dropTime = 850;
    }else if (linesCleared < 30){
        dropTime = 700;
    }else if (linesCleared < 40){
        dropTime = 550;
    }else if (linesCleared < 50){
        dropTime = 400;
    }else if (linesCleared < 60){
        dropTime = 250;
    }else if (linesCleared < 70){
        dropTime = 100;
    }else if (linesCleared < 80){
        dropTime = 75;
    }else if (linesCleared < 90){
        dropTime = 50;
    }else if (linesCleared < 100){
        dropTime = 25;
    }else{
        dropTime = 15;
    }
}

function clearLines(){
    var clear = true;
    var queue = [];
    for (var y = 0; y < board.length; y++){
        clear = true;
        for (var x = 0; x < board[y].length; x++){
            if (board[y][x] == 0){
                clear = false;
            }
        }
        if (clear){
            queue.push(y);
        }  
    }
    switch(queue.length){
        case 1:
            score += 40 * (level+1);
            break;
        case 2:
            score += 100 * (level+1);
            break;
        case 3:
            score += 300 * (level+1);
            break;
        case 4:
            score += 1200 * (level+1);
            break;
    }
    for (var a = 0; a < queue.length; a++){
        board.splice(queue[a], 1);
        board.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
    linesCleared += queue.length;
    queue = [];
}

function place(){
    for (var a = 0; a < piece.tiles.length; a++){
        board[piece.tiles[a][1]][piece.tiles[a][0]] = piece.id; 
    }

    piece = newPiece(nextPiece[0]);
    nextPiece.shift();
    ghost.tiles = piece.tiles;
    nextPiece.push(int(random(1,8)));
    held = false;
}

function hardDrop(){
    var blocked = false;
    while(true){
        for (var a = 0; a < piece.tiles.length; a++){
            if (piece.tiles[a][1] > 18 ||board[piece.tiles[a][1]+1][piece.tiles[a][0]] != 0){
                blocked = true;
            }
            piece.tiles[a][1]++;
        }
        if (blocked){
            for (var a = 0; a < piece.tiles.length; a++){
                piece.tiles[a][1]-= 1;
            }
            place();
            break;
        }
    }
}

function showSidePiece(x, y, n, tileSize){
    /* 
    1 = I
    2 = O
    3 = T
    4 = J
    5 = L
    6 = S
    7 = Z
    */
    tiles = [];
    switch(n){
        case 1:
            tiles[0] = [0, 0];
            tiles[1] = [1, 0];
            tiles[2] = [2, 0];
            tiles[3] = [3, 0];
            break;
        case 2:
            tiles[0] = [1, 0];
            tiles[1] = [1, 1];
            tiles[2] = [2, 0];
            tiles[3] = [2, 1];
            break;
        case 3:
            tiles[0] = [0, 1];
            tiles[1] = [1, 1];
            tiles[2] = [2, 1];
            tiles[3] = [1, 0];
            break;
        case 4:
            tiles[0] = [0, 0];
            tiles[1] = [0, 1];
            tiles[2] = [1, 1];
            tiles[3] = [2, 1];
            break;
        case 5:
            tiles[0] = [2, 0];
            tiles[1] = [0, 1];
            tiles[2] = [1, 1];
            tiles[3] = [2, 1];
            break;
        case 6:
            tiles[0] = [0, 1];
            tiles[1] = [1, 1];
            tiles[2] = [1, 0];
            tiles[3] = [2, 0];
            break;
        case 7:
            tiles[0] = [0, 0];
            tiles[1] = [1, 0];
            tiles[2] = [1, 1];
            tiles[3] = [2, 1];
            break;
    }
    for (var a = 0; a < tiles.length; a++){
        rect(x + tiles[a][0] * tileSize, y + tiles[a][1] * tileSize, tileSize, tileSize)
    }
}

function checkLose(){
    tiles = [];
    var x;
    /* 
    1 = I
    2 = O
    3 = T
    4 = J
    5 = L
    6 = S
    7 = Z
    */
    for (var a = 0; a < piece.tiles.length; a++){
        if (piece.tiles[a][1] >= 0){
            if (board[piece.tiles[a][1]][piece.tiles[a][0]] != 0){
                gameState = 2;
            }
        }
    }
}