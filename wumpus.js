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

    printWorld() {
        this.safe.push(this.agentPosition);

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.safe.find((pos) => pos.x === i && pos.y === j) && !(i === this.agentPosition.x && j === this.agentPosition.y)) {
                    process.stdout.write("S ");
                } else if (i === this.agentPosition.x && j === this.agentPosition.y) {
                    process.stdout.write("A ");
                } else if (i === this.wumpusPosition.x && j === this.wumpusPosition.y) {
                    // Hide Wumpus for the player
                    process.stdout.write(". ");
                } else if (i === this.goldPosition.x && j === this.goldPosition.y) {
                    // Hide Gold for the player
                    process.stdout.write(". ");
                } else if (this.pitPositions.find((pos) => pos.x === i && pos.y === j)) {
                    // Hide Pits for the player
                    process.stdout.write(". ");
                } else {
                    process.stdout.write(". ");
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

    isValidMove() {
        const { x, y } = this.agentPosition;

        if (x === this.wumpusPosition.x && y === this.wumpusPosition.y) {
            console.log("Game Over! Wumpus got you!");
            return false;
        } else if (x === this.goldPosition.x && y === this.goldPosition.y) {
            console.log("Congratulations! You found the gold!");
            return false;
        } else if (this.pitPositions.find((pos) => pos.x === x && pos.y === y)) {
            console.log("Game Over! You fell into a pit!");
            return false;
        }
    }

}


