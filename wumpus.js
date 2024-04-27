
class WumpusWorld {
    constructor(size) 
    {
        this.size = size;
        this.agentPosition = { x: 0, y: 0 };
        this.wumpusPosition = this.generateRandomPosition();
        this.goldPosition = this.generateRandomPosition();
        this.pitPositions = [];
        for (let i = 0; i < Math.floor(size / 2); i++) {
            this.pitPositions.push(this.generateRandomPosition());
        }
        this.safe = [];
    }

    generateRandomPosition() {
        return {
            x: Math.floor(Math.random() * (this.size - 1)) + 1,
            y: Math.floor(Math.random() * (this.size - 1)) + 1,
        };
    }

    distance(p1, p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    printWorld(achive) 
    {
        const tempposition = { x:this.agentPosition.x, y:this.agentPosition.y }
        this.safe.push(tempposition);

        // // console.log(this.agentPosition);

        // console.log(this.safe);

        // const index = this.safe.findIndex(pos => pos.x === 1 && pos.y === 1);
        // console.log(index);


        for (let i = 0; i < this.size; i++) 
        {
            for (let j = 0; j < this.size; j++) 
            {
                var div = document.getElementById((i * this.size + j + 1).toString());

                const index = this.safe.findIndex(pos => pos.x === i && pos.y === j );
                if( achive === "g" && (i === this.agentPosition.x && j === this.agentPosition.y)  )
                {
                    div.textContent = "🧑🪙";
                } 
                else if ( index !=-1 && !(i === this.agentPosition.x && j === this.agentPosition.y)) {
                    div.textContent = "🚗";
                    console.log('TRUE');
                } 
                else if (i === this.agentPosition.x && j === this.agentPosition.y) {
                    // process.stdout.write("A ");
                    div.textContent = "🧑\nAgent";

                } else if (i === this.wumpusPosition.x && j === this.wumpusPosition.y) {
                    // Hide Wumpus for the player
                    div.textContent = "👻\nWumpus";
                } else if (i === this.goldPosition.x && j === this.goldPosition.y) {
                    // Hide Gold for the player
                    div.textContent = "🪙\nGold";
                } else if (this.pitPositions.find((pos) => pos.x === i && pos.y === j)) {
                    // Hide Pits for the player
                    div.textContent = "🕳️\nPit";
                }
                else {
                    div.textContent = ".";
                }
            }
            
            console.log();
        }

        if (this.distance(this.agentPosition, this.wumpusPosition) === 1) {
            console.log("Stench found!");
        }

        for (const pit of this.pitPositions) {
            if (this.distance(this.agentPosition, pit) === 1) {
                console.log("Breeze found!");
            }
        }
    }

    moveAgent(direction) {
        switch (direction.toUpperCase()) {
            case "UP":
                if (this.agentPosition.x > 0) {
                    this.agentPosition.x--;
                }
                break;
            case "DOWN":
                if (this.agentPosition.x < this.size - 1) {
                    this.agentPosition.x++;
                }
                break;
            case "LEFT":
                if (this.agentPosition.y > 0) {
                    this.agentPosition.y--;
                }
                break;
            case "RIGHT":
                if (this.agentPosition.y < this.size - 1) {
                    this.agentPosition.y++;
                }
                break;
            default:
                console.log("Invalid move!");
        }
    }

    async isValidMove() {
        const { x, y } = this.agentPosition;

        console.log(this.agentPosition , this.goldPosition)

        if (x === this.wumpusPosition.x && y === this.wumpusPosition.y) {
            console.log("Game Over! Wumpus got you!");
            return false;
        } else if (x === this.goldPosition.x && y === this.goldPosition.y) {
            this.printWorld("g");
            await sleep(500); // Sleep for 2000 milliseconds (2 seconds)
            alert("Congratulations! You found the gold!");
            location.reload(true);
            return false;
        } else if (this.pitPositions.find((pos) => pos.x === x && pos.y === y)) {
            console.log("Game Over! You fell into a pit!");
            return false;
        }
    }

}


game = new  WumpusWorld(4)



function up()
{
    game.moveAgent("UP");
    game.printWorld();
    game.isValidMove();
}


function down()
{
    game.moveAgent("DOWN");
    game.printWorld();
    game.isValidMove();
}


function left()
{
    game.moveAgent("LEFT");
    game.printWorld();
    game.isValidMove();
}


function right()
{
    game.moveAgent("RIGHT");
    game.printWorld();
    game.isValidMove();
}

function handleItemClick(index) {
    var myDiv = document.getElementById(index);
    alert("Item " + index + " clicked!" );
    // You can add your logic here to handle the click event for each item
}



function start()
{
    var div = document.getElementById("grid-container");
    div.classList.toggle("enable");
    game.printWorld();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
