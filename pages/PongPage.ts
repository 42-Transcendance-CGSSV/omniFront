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

const ws = new WebSocket(`${BASE_WS}`);


class PongPage extends Page {
    private canvasContainer: CanvasElement;
    private ctx: CanvasRenderingContext2D | null = null;
    private player1ID       !: number;
    private player2ID       !: number;
    private paddleWidth: number = 0;
    private paddleHeight: number = 0;
    private paddleMiddle: number = 0;

    constructor() {
        super("PongPage", new NavBar({}));
        this.canvasContainer = new CanvasElement({
            id: "home-content",
            width: 1800,
            height: 1600,
            className: "aspect-[4/3] w-full max-w-[800px]   bg-black flex flex-col items-center justify-center overflow-hidden fixed inset-0 m-auto ",
        });

        this.addComponent(this.canvasContainer);
        super.render();
        document.documentElement.addEventListener("page-rendered", () => {
            this.setupCanvas();
        });
    }

    private setupCanvas(): void {
        this.ctx = this.canvasContainer.getContext();
        const keysPressed = new Set<string>();

        this.paddleWidth = 10;
        this.paddleHeight = 80;
        this.paddleMiddle = this.paddleHeight / 2;

        this.getCtx()?.canvas.setAttribute("tabindex", "0");
        this.getCtx()?.canvas.addEventListener("keydown", (event) => {
            keysPressed.add(event.key);
            if (this.getCtx()) {
                this.requestApiUpdate(keysPressed);
                // this.drawPaddles(this.getCtx(), this.player1pos, this.player2pos);
            }
        });
        this.getCtx()?.canvas.addEventListener("keyup", (event) => {
            keysPressed.delete(event.key);
        });
        this.getCtx()?.canvas.addEventListener("pointerdown", (ev) => {
                console.log("pointer x:", ev.clientX, "pointer y:", ev.clientY, "canvas width:", this.getCtx().canvas.width, "canvas height:", this.getCtx().canvas.height);
                if (ev.clientX < this.getCtx().canvas.width / 2 && ev.clientY < this.getCtx().canvas.height / 2) {
                    console.log("Player 1 clicked");
                    keysPressed.add("ArrowUp");
                    keysPressed.add("w");
                }
                if (this.getCtx()) {
                    this.requestApiUpdate(keysPressed);
                    // this.drawPaddles(this.getCtx(), this.player1pos, this.player2pos);
                }
            },
            false,
        );

        if (this.getCtx()) {
            // this.getPositions();
            // fetchData();
            // this.canvasManager();
            ws.onopen = () => {
                console.log("WebSocket connection established");
                // ws.send(JSON.stringify({ channel: "get-match-data", data: {match_id: 0} }));
                //   "data": {"match_id": 1}
                this.getPositions();
            };

            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("WebSocket message received:", data);
            };
        }
    }


    private requestApiUpdate(keysPressed: Set<string>): void {
        if (keysPressed.has("ArrowUp")) {
            this.moveUp(this.player2ID);
        }
        if (keysPressed.has("ArrowDown")) {
            this.moveDown(this.player2ID);
        }
        if (keysPressed.has("w")) {
            this.moveUp(this.player1ID);
        }
        if (keysPressed.has("s")) {
            this.moveDown(this.player1ID);
        }
        if (keysPressed.has("Escape")) {
            this.stopGame();
        }
        if (keysPressed.has("Enter")) {
            this.startGame();
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

    private drawGame(data: {
        ball: { relativeBallX: number; relativeBallY: number; ballRadius: number };
        players: { Player_id: number; playerColor: string; side: string; relativeY: number }[]
    }): void {

        window.addEventListener("resize", () => {
            this.canvasManager();
        });

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
            this.getCtx().fillStyle = player.playerColor;
            const x = player.side === "left" ? 0 : this.getCtx().canvas.width - this.paddleWidth;
            this.getCtx().fillRect(x, this.denormalizePosition(player.relativeY, this.getCtx().canvas.height, 0) - this.paddleMiddle, this.paddleWidth, this.paddleHeight);
        });
    }

    private canvasManager() {
        const liveScreenwidth = this.getCtx().canvas.clientWidth;
        const liveScreenHeight = this.getCtx().canvas.clientHeight;
        // console.log("liveScreenwidth:", liveScreenwidth, "liveScreenHeight:", liveScreenHeight);

        if (this.getCtx().canvas.width !== liveScreenwidth || this.getCtx().canvas.height !== liveScreenHeight) {
            this.getCtx().canvas.width = liveScreenwidth;
            this.getCtx().canvas.height = liveScreenHeight;
            // console.log("Canvas resized to:", liveScreenwidth, liveScreenHeight);
            if (this.getCtx().canvas.width < 600 && this.getCtx().canvas.height < 450) {
                this.getCtx().canvas.style.transform = "rotate(90deg)";
                // console.log("Canvas rotated to 90 degrees :" ,this.getCtx().canvas.style.transform);
            } else
                this.getCtx().canvas.style.transform = "rotate(0deg)";
        }
    }

    private getPositions() {
        if (polling)
            return;
        polling = true;

        const loop = () => {
            ws.send(JSON.stringify({channel: "get-match-data", data: {match_id: 0}}));

            ws.onmessage = (event) => {
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
            setTimeout(loop, 17);
        }

        loop();
    }

    private startGame() {
        // fetch(`${BASE}/startGame/${gameid}`, { method: 'PUT' })
        ws.send(JSON.stringify({channel: "toggle-pause-match", data: {match_id: 0}}));
        console.log("Game started");

    }

    private stopGame() {
        fetch(`${BASE}/stopGame/${gameid}`, {method: 'PUT'})
    }

    private moveUp(playerID: number) {
        ws.send(JSON.stringify({channel: "move-paddle", data: {user_id: playerID, direction: "up"}}));
    }

    private moveDown(playerID: number) {
        ws.send(JSON.stringify({channel: "move-paddle", data: {user_id: playerID, direction: "down"}}));
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
                    this.moveUp(player.Player_id);
                } else if (readyRes.move === 'down') {
                    this.moveDown(player.Player_id);
                }
            }
        })

    }
}

export default PongPage;
