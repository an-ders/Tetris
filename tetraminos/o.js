class O{
    constructor (tileSize){
        this.rotation = 0;

        this.id = 2;
        
        this.x = 4; 
        this.y = 0;
        this.tileSize = tileSize;
        this.tiles = [];
        for (let i = 0; i < 2; i++){
            for (let j = 0; j < 2; j++){
                this.tiles.push([this.x + i, this.y + j])
            }
        }
    }
    show(xOffset, yOffset){
        fill(245,225,75)
        stroke(200)
        for (var a = 0; a < this.tiles.length; a++){
            var tile = this.tiles[a];
            if (tile[1] >= 0)
                rect(xOffset + tile[0] * this.tileSize, yOffset + tile[1] * this.tileSize, this.tileSize, this.tileSize)
        }   
    }

    moveDown(board){
        for (var a = 0; a < this.tiles.length; a++){
            if (this.tiles[a][1] < 0){
                continue;
            }
            if (this.tiles[a][1]+1 > 19 || board[this.tiles[a][1]+1][this.tiles[a][0]] != 0 || board[this.tiles[a][1]][this.tiles[a][0]] != 0){
                return false;
            }
        }
        this.tiles.forEach(function(tile){
            tile[1]++;
        });
        return true;
    }
    moveLeft(board){
        var valid = true;
        for (var a = 0; a < this.tiles.length; a++){
            if (this.tiles[a][1] < 0){
                continue;
            }
            if (this.tiles[a][0] < 0 || board[this.tiles[a][1]][this.tiles[a][0]-1] != 0){
                valid = false;
            }
        }if (valid){
            this.tiles.forEach(function(tile){
                tile[0]--;
            });
        }
    }

    moveRight(board){
        var valid = true;
        for (var a = 0; a < this.tiles.length; a++){
            if (this.tiles[a][1] < 0){
                continue;
            }
            if (this.tiles[a][0] > 9 || board[this.tiles[a][1]][this.tiles[a][0]+1] != 0){
                valid = false;
            }
        }if (valid){
            this.tiles.forEach(function(tile){
                tile[0]++;
            });
        }
    }

    rotateCW(board){

    }
    rotateCCW(board){

    }
}