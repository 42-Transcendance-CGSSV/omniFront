import Page from "@classes/Page";
import NavBar from "@components/NavBar";
import CanvaComponent from "@elements/CanvaElement";

let UPDATE_INTERVAL_MS = 17; // 60 FPS same as .env but fuck it

let isInActiveinterval = false;
const BASE = 'http://localhost:3000/api';
const BASEAI = 'http://localhost:3001/api';
let polling = false;
const gameid = 10;


class PongPage extends Page {
    private canva: CanvaComponent;
    private ctx: CanvasRenderingContext2D;
    private player1ID       !: string;
    private player2ID       !: string;


    private readonly REFERENCE_WIDTH: number = 800;
    private readonly REFERENCE_HEIGHT: number = 450;

    private scale = 1;
    private gameWidth = 0;
    private gameHeight = 0;


    constructor() {
        super("PongPage", new NavBar({}));
        this.canva = new CanvaComponent({
            id: "pong-canva",
            width: this.REFERENCE_WIDTH,
            height: this.REFERENCE_HEIGHT,
            className: "bg-black/50 p-4 m-auto",
        });
        this.addComponent(this.canva);
        super.render();

        const keysPressed = new Set<string>();
        document.documentElement.addEventListener("page-rendered", () => {
            this.setupResponsiveCanvas(this.canva)
            this.ctx = this.canva.getContext();
            this.ctx?.canvas.setAttribute("tabindex", "0");
            this.ctx?.canvas.addEventListener("keydown", (event) => {
                keysPressed.add(event.key);
                if (this.ctx) {
                    this.requestApiUpdate(keysPressed);
                    // this.drawPaddles(this.ctx, this.player1pos, this.player2pos);
                }
            });
            this.ctx?.canvas.addEventListener("keyup", (event) => {
                keysPressed.delete(event.key);
            });

            if (this.ctx) {
                this.getPositions();
            }
        });
    }


    private setupResponsiveCanvas(canvas: CanvaComponent): void {
        const resize = () => {
            const container = canvas.element?.parentElement!;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            const widthRatio = containerWidth / this.REFERENCE_WIDTH;
            const heightRatio = containerHeight / this.REFERENCE_HEIGHT;
            this.scale = Math.min(widthRatio, heightRatio);

            this.gameWidth = this.REFERENCE_WIDTH * this.scale;
            console.log(`Game Width: ${this.gameWidth}`);
            this.gameHeight = this.REFERENCE_HEIGHT * this.scale;

            canvas.element!.width = this.gameWidth;
            canvas.element!.height = this.gameHeight;
            canvas.element!.style.width = `${this.gameWidth}px`;
            canvas.element!.style.height = `${this.gameHeight}px`;
            canvas.element!.style.display = 'block';
            canvas.element!.style.margin = '0 auto';
        };

        resize();
        window.addEventListener('resize', resize);
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


    private drawGame(data: {
        ball: { ballX: number; ballY: number; ballRadius: number };
        players: { PlayerID: string; playerColor: string; side: string; PaddlePos: number }[]
    }): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


        this.ctx.beginPath();
        this.ctx.arc(data.ball.ballX, data.ball.ballY, data.ball.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = "white";
        this.ctx.fill();

        data.players.forEach(player => {
            if (player.side === "left") {
                this.player1ID = player.PlayerID;
            } else {
                this.player2ID = player.PlayerID;
            }
            this.ctx.fillStyle = player.playerColor;
            const paddleWidth = 10;
            const paddleHeight = 80;
            const x = player.side === "left" ? 0 : this.ctx.canvas.width - paddleWidth;
            this.ctx.fillRect(x, player.PaddlePos, paddleWidth, paddleHeight);
        });
    }

    private getPositions() {
        if (polling)
            return;
        polling = true;

        const loop = () => {
            fetch(`${BASE}/match/${gameid}`)
                .then(res => res.json())
                .then(data => {
                    this.drawGame(data);
                    if (data.isRunning) {
                        this.MoveAIs(data);
                    }
                    setTimeout(loop, 17);
                })
                .catch(error => {
                    console.error("Error fetching game data:", error);
                });
        }

        loop();
    }

    private startGame() {
        fetch(`${BASE}/startGame/${gameid}`, {method: 'PUT'})
    }

    private stopGame() {
        fetch(`${BASE}/stopGame/${gameid}`, {method: 'PUT'})
    }

    private moveUp(playerID: string) {
        fetch(`${BASE}/movePlayerUp/${playerID}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({playerID}),
        })
    }

    private moveDown(playerID: string) {
        fetch(`${BASE}/movePlayerDown/${playerID}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({playerID}),
        })
    }

    private async MoveAIs(data: {
        ball: { ballX: number; ballY: number; ballVelocityX: number; ballVelocityY: number };
        players: {
            PlayerID: string;
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
                    this.moveUp(player.PlayerID);
                } else if (readyRes.move === 'down') {
                    this.moveDown(player.PlayerID);
                }
            }
        })

    }
}

export default PongPage;
