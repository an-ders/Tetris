class S{
    constructor (tileSize){
        this.rotation = 0;

        this.id = 6;
        
        this.x = 5; 
        this.y = 0;
        this.tileSize = tileSize;
        this.tiles = [];
        this.tiles.push([this.x, this.y])
        this.tiles.push([this.x+1, this.y])
        this.tiles.push([this.x, this.y+1])
        this.tiles.push([this.x-1, this.y+1])
    }
    show(xOffset, yOffset){
        fill(120,240,60);
        stroke(200);
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
        const OFFSETS_0 = [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]];
        const OFFSETS_1 = [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]];
        const OFFSETS_2 = [[0,0],[1,0],[1,-1],[0,2],[1,2]];
        const OFFSETS_3 = [[0,0],[1,0],[1,1],[0,-2],[1,-2]];
        this.rotation++;
        if (this.rotation == 4)
            this.rotation = 0;
        var baseX;
        var baseY;
        var offsetGroup;
        switch (this.rotation){//---------------------------------rotating the piece
            case 0:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX-1, baseY];
                this.tiles[1] = [baseX, baseY-1];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX+1, baseY-1];
                offsetGroup = OFFSETS_0;
                break;
            case 1:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX+1, baseY];
                this.tiles[1] = [baseX+1, baseY+1];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX, baseY-1];
                offsetGroup = OFFSETS_1;
                break;
            case 2:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX-1, baseY+1];
                this.tiles[1] = [baseX+1, baseY];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX, baseY+1];
                offsetGroup = OFFSETS_2;
                break;
            case 3:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX-1, baseY-1];
                this.tiles[1] = [baseX-1, baseY];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX, baseY+1];
                offsetGroup = OFFSETS_3;
                break;
        }
        var  b, offset, xCord, yCord;
        var valid = false;
        for (var o = 0; o < offsetGroup.length; o++){
            b = true;
            for (var a = 0; a < this.tiles.length; a++){
                offset = offsetGroup[o];
                xCord = this.tiles[a][0]+offset[0];
                yCord = this.tiles[a][1]+offset[1];
                if (yCord < 0){
                    continue;
                }if(xCord < 0 && xCord > 9 && yCord < 19){
                    b = false;
                    break;
                }else if(board[yCord][xCord] != 0){
                    b = false;
                    break;
                }
            }
            if (b){
                valid = true;
                this.tiles.forEach(function(tile){
                    tile[0] += offset[0];
                    tile[1] += offset[1];
                });
                break;
            }  
        }
        if (!valid){
            this.rotateCCW(board)
        }
    }
    rotateCCW(board){
        const OFFSETS_0 = [[0,0],[1,0],[1,-1],[0,2],[1,2]];
        const OFFSETS_1 = [[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]];
        const OFFSETS_2 = [[0,0],[-1,0],[-1,-1],[0,2],[-1,2]];
        const OFFSETS_3 = [[0,0],[1,0],[1,1],[0,-2],[1,-2]];
        this.rotation--;
        if (this.rotation == -1)
            this.rotation = 3;
        var baseX;
        var baseY;
        var offsetGroup;
        switch (this.rotation){//---------------------------------rotating the piece
            case 0:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX-1, baseY];
                this.tiles[1] = [baseX, baseY-1];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX+1, baseY-1];
                offsetGroup = OFFSETS_0;
                break;
            case 1:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX+1, baseY];
                this.tiles[1] = [baseX+1, baseY+1];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX, baseY-1];
                offsetGroup = OFFSETS_1;
                break;
            case 2:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX-1, baseY+1];
                this.tiles[1] = [baseX+1, baseY];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX, baseY+1];
                offsetGroup = OFFSETS_2;
                break;
            case 3:
                baseX = this.tiles[2][0];
                baseY = this.tiles[2][1];
                this.tiles[0] = [baseX-1, baseY-1];
                this.tiles[1] = [baseX-1, baseY];
                this.tiles[2] = [baseX, baseY];
                this.tiles[3] = [baseX, baseY+1];
                offsetGroup = OFFSETS_3;
                break;
        }
        var b, offset, xCord, yCord;
        var valid = false;
        for (var o = 0; o < offsetGroup.length; o++){
            b = true;
            for (var a = 0; a < this.tiles.length; a++){
                offset = offsetGroup[o];
                xCord = this.tiles[a][0]+offset[0];
                yCord = this.tiles[a][1]+offset[1];
                if (yCord < 0){
                    continue;
                }if(xCord < 0 && xCord > 9 && yCord < 19){
                    b = false;
                    break;
                }else if(board[yCord][xCord] != 0){
                    b = false;
                    break;
                }
            }
            if (b){
                valid = true;
                this.tiles.forEach(function(tile){
                    tile[0] += offset[0];
                    tile[1] += offset[1];
                });
                break;
            }  
        }
        if (!valid){
            this.rotateCW(board)
        }
    }
}