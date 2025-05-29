import Page from "@classes/Page";
import NavBar from "@components/NavBar";
import CanvasElement from "@elements/CanvasElement";

let UPDATE_INTERVAL_MS = 17; // 60 FPS same as .env but fuck it

let isInActiveinterval = false;
const BASE = 'http://localhost:3000/api';
const BASE_WS = 'http://localhost:3000/pong-ws';
const BASEAI = 'http://localhost:3001/api';
let polling = false;
const gameid = 0;

class PongPage extends Page {
    private canvasContainer: CanvasElement;
    private ctx: CanvasRenderingContext2D | null = null;
    private player1ID       !: number;
    private player2ID       !: number;
    private paddleWidth: number = 0;
    private paddleHeight: number = 0;
    private paddleMiddle: number = 0;
    private ws?: WebSocket;
    private keysPressed: {user_id: number, movement_type: "up" | "down" | null, key: string}[] = [];


    constructor() {
        super("PongPage", new NavBar({}));

        this.canvasContainer = new CanvasElement({
            id: "game-content",
            width: 1920,
            height: 1800,
            className: "max-h-[90%] max-w-[90%] pr-2 pl-2 outline-2 rounded-3xl outline-lavender mx-auto my-auto",
        });

        this.addComponent(this.canvasContainer);
        super.render();
        document.documentElement.addEventListener("page-rendered", () => {
            this.ws = new WebSocket(`${BASE_WS}`);
            this.setupCanvas();
        });
    }

    private setupCanvas(): void {
        this.ctx = this.canvasContainer.getContext();

        this.paddleWidth = 10;
        this.paddleHeight = 80;
        this.paddleMiddle = this.paddleHeight / 2;

        this.getCtx()?.canvas.setAttribute("tabindex", "0");
        this.rescaleCanvas();


        screen.orientation.addEventListener('change', () =>  this.rescaleCanvas());


        this.getCtx()?.canvas.addEventListener("keydown", (event) => this.handlePlayerMovements(event));
        this.getCtx()?.canvas.addEventListener("keyup", (event) => this.handlePlayerMovements(event));

        this.getCtx()?.canvas.addEventListener("pointerdown", (ev) => {
                console.log("pointer x:", ev.clientX, "pointer y:", ev.clientY, "canvas width:", this.getCtx().canvas.width, "canvas height:", this.getCtx().canvas.height);
                // if (ev.clientX < this.getCtx().canvas.width / 2 && ev.clientY < this.getCtx().canvas.height / 2) {
                //     console.log("Player 1 clicked");
                //     keysPressed.add("ArrowUp");
                //     keysPressed.add("w");
                // }
                // if (this.getCtx()) {
                //     this.handlePlayerMovements(keysPressed);
                //     this.drawPaddles(this.getCtx(), this.player1pos, this.player2pos);
                // }
            },
            false,
        );

        if (this.getCtx()) {
        

            // this.getPositions();
            // fetchData();
            // this.rescaleCanvas();
            this.getWs().onopen = () => {
                console.log("WebSocket connection established");
                // ws.send(JSON.stringify({ channel: "get-match-data", data: {match_id: 0} }));
                //   "data": {"match_id": 1}
                this.getPositions();
            };

            this.getWs().onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            this.getWs().onclose = () => {
                console.log("WebSocket connection closed");
            };
            this.getWs().onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("WebSocket message received:", data);
            };
        }
    }


    private async handlePlayerMovements(event: KeyboardEvent): Promise<void> {

        if (event.type === "keydown")
        {
            const playerId = event.key === "ArrowUp" || event.key === "ArrowDown" ? this.player2ID : (event.key === "w" || event.key === "s") ? this.player1ID : -1;
            const movement: "up" | "down" | null = event.key === "ArrowDown" || event.key === "s" ? "down" : (event.key === "ArrowUp" || event.key === "w") ? "up" : null;

            if (!this.keysPressed.find((key) => key.user_id === playerId))
                this.keysPressed.push({user_id: playerId, movement_type: movement, key: event.key})
            if (event.key === "Escape") {
                this.stopGame();
            }
            if (event.key === "Enter") {
                this.startGame();
            }

        }


      //  console.log(this.keysPressed)

        if (event.type === "keyup")
        {
            //Remove the good user id. How to know the user_id of the player has keyup if two player has the same key in the array ?
            this.keysPressed = this.keysPressed.filter((value) => value.key !== event.key);
            console.log("keyup", this.keysPressed);
        }

    }

    private denormalizePosition(normalizedPosition: number, max: number, min: number): number {
        return normalizedPosition * (max - min) + min;
    }

    private getCtx(): CanvasRenderingContext2D {
        if (!this.ctx) {
            throw new Error("Can't get canvas context");
        }
        return this.ctx;
    }

    private getWs(): WebSocket {
        if (!this.ws)
            throw new Error("Can't get the websocket");
        return this.ws;
    }

    private drawGame(data: {
        ball: { relativeBallX: number; relativeBallY: number; ballRadius: number };
        players: { Player_id: number; playerColor: string; side: string; relativeY: number }[]
    }): void {

        window.addEventListener("resize", () => this.rescaleCanvas());

        this.getCtx().clearRect(0, 0, this.getCtx().canvas.width, this.getCtx().canvas.height);
        this.getCtx().lineWidth = 2;
        this.getCtx().strokeStyle = "white";

        // console.log("canvas width:", this.getCtx().canvas.clientWidth , "canvas height:", this.getCtx().canvas.clientHeight);

        this.getCtx().beginPath();
        this.getCtx().moveTo(this.getCtx().canvas.width / 2, 0);
        this.getCtx().lineTo(this.getCtx().canvas.width / 2, this.getCtx().canvas.height);
        this.getCtx().stroke();

        // console.log("Drawing game with data:", data.players.map(player => ({player.relativeY})));
        this.getCtx().beginPath();
        this.getCtx().arc(this.denormalizePosition(data.ball.relativeBallX, this.getCtx().canvas.width, 0),
            this.denormalizePosition(data.ball.relativeBallY, this.getCtx().canvas.height, 0), data.ball.ballRadius, 0, Math.PI * 2);
        // console.log("Ball position:", this.denormalizePosition(data.ball.relativeBallX, this.getCtx().canvas.width, 0), this.denormalizePosition(data.ball.relativeBallY, this.getCtx().canvas.height, 0));
        this.getCtx().fillStyle = "white";
        this.getCtx().fill();

        data.players.forEach(player => {
            if (player.side === "left") {
                this.player1ID = player.Player_id;
                // console.log("at position:", this.denormalizePosition(player.relativeY, this.getCtx().canvas.height, 0) + " before denormalization " + player.relativeY);
            } else {
                this.player2ID = player.Player_id;
            }
            this.getCtx().fillStyle = '#B794DB';
            const x = player.side === "left" ? 0 : this.getCtx().canvas.width - this.paddleWidth;
            this.getCtx().shadowColor = '#B794DB';
            this.getCtx().shadowBlur = 10;
            // this.getCtx().shadowOffsetX = 5;
            // this.getCtx().shadowOffsetY = 5;
            // this.getCtx().

            this.getCtx().fillRect(x, this.denormalizePosition(player.relativeY, this.getCtx().canvas.height, 0) - this.paddleMiddle, this.paddleWidth, this.paddleHeight);
            this.getCtx().shadowColor = 'transparent';
        });
    }

    private rescaleCanvas() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
    
        const canvas = this.getCtx().canvas;
    
        // Reset transformation for proper updates
        canvas.style.transform = "";
        canvas.style.transformOrigin = "";
    
        const isPortrait = screenHeight > screenWidth;
    
        if (isPortrait) {
            canvas.width = Math.floor(screenHeight * 0.75);
            canvas.height = Math.floor(screenWidth * 0.9);
            canvas.style.transform = "rotate(90deg)";
            return;
        }
        canvas.width = Math.floor(screenWidth * 0.8);
        canvas.height = Math.floor(screenHeight * 0.6);
        canvas.style.transform = "none";
    }
    

    private getPositions() {
        if (polling)
            return;
        polling = true;

        const loop = () => {

            document.getElementById("game-content")!.focus();
            this.getCtx()?.canvas.focus(); 

            for (let element of this.keysPressed) 
            {
                if (element.movement_type)
                this.move(element.user_id, element.movement_type)
            }

            this.getWs().send(JSON.stringify({channel: "get-match-data", data: {match_id: 0}}));
            this.getWs().onmessage = (event) => {
                //console.log(event.data);
                const data = JSON.parse(event.data);
                if (!data || !data.data || !data.data.ball || !data.data.players) {
                    console.log("waiting for data");
                    // setTimeout(loop, 17); // Retry after 17ms
                    return;
                }
                // console.log("Received data:", data);
                this.drawGame(data.data);

                if (data.isRunning) {
                    //   this.MoveAIs(data);
                }
            };
            setTimeout(loop, UPDATE_INTERVAL_MS);
        }

        loop();
    }


    private startGame() {
        // fetch(`${BASE}/startGame/${gameid}`, { method: 'PUT' })
        this.getWs().send(JSON.stringify({channel: "toggle-pause-match", data: {match_id: 0}}));
        console.log("Game started");

    }

    private stopGame() {
        fetch(`${BASE}/stopGame/${gameid}`, {method: 'PUT'})
    }

    private move(playerID: number, direction: "up" | "down") {
        this.getWs().send(JSON.stringify({channel: "move-paddle", data: {user_id: playerID, direction: direction}}));
    }

    private async MoveAIs(data: {
        ball: { ballX: number; ballY: number; ballVelocityX: number; ballVelocityY: number };
        players: {
            Player_id: number;
            playerColor: string;
            side: string;
            PaddlePos: number;
            AI: boolean;
            PlayerName: string;
            numberOfGoals: number
        }[]
    }) {
        // console.log(data);

        data.players.forEach(async player => {
            if (player.AI === true) {
                let res = await fetch(`${BASEAI}/train`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        playerID: player.PlayerName,
                        ballX: data.ball.ballX,
                        ballY: data.ball.ballY,
                        ballSpeedX: data.ball.ballVelocityX,
                        ballSpeedY: data.ball.ballVelocityY,
                        myPosition: player.PaddlePos,
                        PaddleHeight: '80',
                        myScore: player.numberOfGoals,
                        mySide: `${player.side === 'left' ? 0.9 : 0.1}`
                    })
                })
                let readyRes = await res.json();
                if (readyRes.move === 'up') {
                    // console.log(player.PlayerID);
                  //TODO: FIX  this.moveUp(player.Player_id);
                } else if (readyRes.move === 'down') {
                //TODO: FIX    this.moveDown(player.Player_id);
                }
            }
        })

    }
}

export default PongPage;
