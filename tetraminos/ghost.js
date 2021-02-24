class Ghost{
    constructor(tiles, tileSize){
        this.tiles = tiles;
        this.tileSize = tileSize;
        this.z = 0;
    }
    show(xOffset, yOffset, board){
        if (this.z > 0){
            fill(170,170,170);
            stroke(200);
            for (var a = 0; a < this.tiles.length; a++){
                var tile = this.tiles[a];
                if (tile[1]+this.z !=  tile){
                    rect(xOffset + tile[0]* this.tileSize, yOffset + (tile[1] + this.z)* this.tileSize, this.tileSize, this.tileSize)
                }
            }  
        }     
    }
    update(board){
        var blocked = false;
        this.z = 1;
        for (var n = 0; n < 20; n++){
            for (var a = 0; a < this.tiles.length; a++){
                if (this.tiles[a][1] < 0){
                    continue;
                }
                if (this.tiles[a][1]+this.z > 19 || board[this.tiles[a][1]+this.z][this.tiles[a][0]] != 0){
                    blocked = true;
                }
            }
            if (blocked){
                this.z-= 1;
                break;
            }else{
                this.z++;
            }
        }
    }
}