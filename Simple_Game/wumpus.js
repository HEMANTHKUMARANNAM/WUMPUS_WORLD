
class WumpusWorld {
    // constructor(size) 
    // {
    //     this.size = size;
    //     this.agentPosition = { x: 0, y: 0 };
    //     this.wumpusPosition = this.generateRandomPosition();
    //     this.goldPosition = this.generateRandomPosition();
    //     this.pitPositions = [];
    //     for (let i = 0; i < Math.floor(size / 2); i++) {
    //         this.pitPositions.push(this.generateRandomPosition());
    //     }
    //     this.safe = [];
    // }

    constructor(size) 
    {
        this.size = size;
        this.agentPosition = { x: 4, y:0  };
        this.wumpusPosition = this.generateRandomPosition();
        do {
            this.goldPosition = this.generateRandomPosition();
        } while (this.goldPosition.x === this.wumpusPosition.x && this.goldPosition.y === this.wumpusPosition.y);
        this.pitPositions = [];
        for (let i = 0; i < Math.floor(size / 2); i++) {
            let pitPos;
            do {
                pitPos = this.generateRandomPosition();
            } while ((pitPos.x === this.wumpusPosition.x && pitPos.y === this.wumpusPosition.y) || (pitPos.x === this.goldPosition.x && pitPos.y === this.goldPosition.y) || this.pitPositions.some(p => p.x === pitPos.x && p.y === pitPos.y));
            this.pitPositions.push(pitPos);
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
                else if( achive === "w" && (i === this.agentPosition.x && j === this.agentPosition.y)  )
                {
                    div.textContent = "🧑👻";
                } 
                else if( achive === "p" && (i === this.agentPosition.x && j === this.agentPosition.y)  )
                {
                    div.textContent = "🧑🕳️";
                } 
                else if ( index !=-1 && !(i === this.agentPosition.x && j === this.agentPosition.y)) {
                    div.textContent = "🚗";
                    console.log('TRUE');
                } 
                else if (i === this.agentPosition.x && j === this.agentPosition.y) {
                    div.textContent = "🧑\nAgent";

                } else if (i === this.wumpusPosition.x && j === this.wumpusPosition.y) {
                    // Hide Wumpus for the player
                    // div.textContent = "👻\nWumpus";
                } else if (i === this.goldPosition.x && j === this.goldPosition.y) {
                    // Hide Gold for the player
                    // div.textContent = "🪙\nGold";
                } else if (this.pitPositions.find((pos) => pos.x === i && pos.y === j)) {
                    // Hide Pits for the player
                    // div.textContent = "🕳️\nPit";
                }
                else {
                    div.textContent = ".";
                }
            }
            
            console.log();
        }

        var input = document.getElementById("myTextBox");
        input.value = ""; // Clear the text

        if (this.distance(this.agentPosition, this.wumpusPosition) === 1) {
            console.log("Stench found!,");
            input.value += "Stench found!"; // Append text
        }

        for (const pit of this.pitPositions) {
            if (this.distance(this.agentPosition, pit) === 1) {
                input.value += "Breeze found!,"; // Append text
            }
        }

        if (this.distance(this.agentPosition, this.goldPosition) === 1) {
            console.log("Stench found!,");
            input.value += "Glitter!"; // Append text
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
            this.printWorld("w");
            var div = document.getElementById("butdiv");
            div.classList.toggle("disable");
            await sleep(2000); // Sleep for 2000 milliseconds (2 seconds)
            alert("Game Over! Wumpus got you!");
            end();
            await sleep(500); // Sleep for 2000 milliseconds (
            return false;
        } else if (x === this.goldPosition.x && y === this.goldPosition.y) {
            this.printWorld("g");
            var div = document.getElementById("butdiv");
            div.classList.toggle("disable");
            await sleep(2000); // Sleep for 2000 milliseconds (2 seconds)
            alert("Congratulations! You found the gold!");
            end();
            await sleep(500); // Sleep for 2000 milliseconds (
            return false;
        } else if (this.pitPositions.find((pos) => pos.x === x && pos.y === y)) {
            this.printWorld("p");
            var div = document.getElementById("butdiv");
            div.classList.toggle("disable");
            await sleep(2000); // Sleep for 2000 milliseconds (2 seconds)
            alert("Game Over! You fell into a pit!");
            end();
            await sleep(500); // Sleep for 2000 milliseconds (
            return false;
        }
    }

}


game = new  WumpusWorld(5)



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


async function end() 
{
    var div = document.getElementById("grid-container");
    div.classList.toggle("enable");
    var bgMusic = document.getElementById("bgMusic");
    bgMusic.pause();
    var div = document.getElementById("start");
    div.classList.toggle("disabled");
    var div = document.getElementById("sensor");
    div.classList.toggle("enable");
    var div = document.getElementById("butdiv");
    div.classList.toggle("disable");
    game = new  WumpusWorld(5)
}


function start()
{
    var div = document.getElementById("grid-container");
    div.classList.toggle("enable");
    game.printWorld();
    var bgMusic = document.getElementById("bgMusic");
    bgMusic.play();
    var div = document.getElementById("start");
    div.classList.toggle("disabled");
    var div = document.getElementById("sensor");
    div.classList.toggle("enable");
    var div = document.getElementById("butdiv");
    div.classList.toggle("disable");
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
