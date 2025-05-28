import {AComponent} from "@dcomponents/AComponent";
import Page from "@classes/Page";
import DivComponent from "@dcomponents/DivComponent";
import TextComponent from "@dcomponents/TextComponent";
import ButtonComponent from "@dcomponents/ButtonComponent";
import NavBar from "@components/NavBar";
import FeatureCard from "@components/FeatureCard";
import GradientButton from "@components/GradientButton";
import Footer from "@components/Footer";
import axios from "axios";
import CanvaComponent from "classes/dcomponents/CanvaComponent";
import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";
let UPDATE_INTERVAL_MS = 17; // 60 FPS same as .env but fuck it 

let isInActiveinterval = false;
const BASE = 'http://localhost:3000/api';
const BASE_WS = 'http://localhost:3000/pong-ws';
const BASEAI = 'http://localhost:3001/api';
let polling = false;
const gameid = 0;


const ws = new WebSocket(`${BASE_WS}`);



class PongPage extends Page {
    private homeContainer   :CanvaComponent;
    private ctx             :CanvasRenderingContext2D;
    private player1ID       !:number;
    private player2ID       !:number;
    private paddleWidth     :number;               
    private paddleHeight    :number;
    private paddleMiddle    :number;
    
    constructor() {
        super("PongPage", new NavBar({}));
        this.homeContainer  = new CanvaComponent({id: "home-content", width: 1800, height: 1600, 
            className: "aspect-[4/3] w-full max-w-[800px]   bg-black flex flex-col items-center justify-center overflow-hidden fixed inset-0 m-auto ",});
            this.ctx            = this.homeContainer.getContext();
            const keysPressed   = new Set<string>();
            
            this.paddleWidth  = 10;
            this.paddleHeight = 80;
            this.paddleMiddle = this.paddleHeight / 2;
            
            this.homeContainer.render();
            
            this.ctx?.canvas.setAttribute("tabindex", "0");
            this.ctx?.canvas.addEventListener("keydown" , (event) => {
                keysPressed.add(event.key);
                if (this.ctx) {
                    this.requestApiUpdate(keysPressed);
                    // this.drawPaddles(this.ctx, this.player1pos, this.player2pos);
                }
            });
            this.ctx?.canvas.addEventListener("keyup" , (event) => {
                keysPressed.delete(event.key);
            });
            this.ctx?.canvas.addEventListener("pointerdown",(ev) => {
                    console.log("pointer x:", ev.clientX, "pointer y:", ev.clientY, "canvas width:", this.ctx.canvas.width, "canvas height:", this.ctx.canvas.height);
                    if (ev.clientX < this.ctx.canvas.width / 2 && ev.clientY < this.ctx.canvas.height / 2) {
                        console.log("Player 1 clicked");
                        keysPressed.add("ArrowUp");
                        keysPressed.add("w");
                    }
                    if (this.ctx) {
                        this.requestApiUpdate(keysPressed);
                        // this.drawPaddles(this.ctx, this.player1pos, this.player2pos);
                    }
                },
                false,
            );
            
            if (this.ctx) {
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
                    console.log("heeele")
                };
                
                
            }
            
            this.addComponent(this.homeContainer);
        }
        
        private requestApiUpdate(keysPressed: Set<string>) : void {
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
        
        private drawGame(data: { ball: { relativeBallX: number; relativeBallY: number; ballRadius: number }; players: { Player_id: number; playerColor: string; side: string; relativeY: number }[] }): void {
            
            window.addEventListener("resize", () => {
                this.canvasManager();
            });
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = "white";
            
            // console.log("canvas width:", this.ctx.canvas.clientWidth , "canvas height:", this.ctx.canvas.clientHeight);
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
            this.ctx.lineTo(this.ctx.canvas.width / 2, this.ctx.canvas.height);
            this.ctx.stroke();
            
            // console.log("Drawing game with data:", data.players.map(player => ({player.relativeY})));
            this.ctx.beginPath();
            this.ctx.arc(this.denormalizePosition(data.ball.relativeBallX, this.ctx.canvas.width, 0), 
            this.denormalizePosition(data.ball.relativeBallY, this.ctx.canvas.height, 0), data.ball.ballRadius, 0, Math.PI * 2);
            // console.log("Ball position:", this.denormalizePosition(data.ball.relativeBallX, this.ctx.canvas.width, 0), this.denormalizePosition(data.ball.relativeBallY, this.ctx.canvas.height, 0));
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            
            data.players.forEach(player => {
                if (player.side === "left") {
                    this.player1ID = player.Player_id;
                    // console.log("at position:", this.denormalizePosition(player.relativeY, this.ctx.canvas.height, 0) + " before denormalization " + player.relativeY);
                }
                else {
                    this.player2ID = player.Player_id;
                }
                this.ctx.fillStyle = player.playerColor; 
                const x = player.side === "left" ? 0 : this.ctx.canvas.width - this.paddleWidth;
                this.ctx.fillRect(x, this.denormalizePosition(player.relativeY, this.ctx.canvas.height ,0) - this.paddleMiddle, this.paddleWidth, this.paddleHeight);
            });
        }
        
        private canvasManager(){
            const liveScreenwidth =  this.ctx.canvas.clientWidth;
            const liveScreenHeight = this.ctx.canvas.clientHeight;
            // console.log("liveScreenwidth:", liveScreenwidth, "liveScreenHeight:", liveScreenHeight);
            
            if (this.ctx.canvas.width !== liveScreenwidth || this.ctx.canvas.height !== liveScreenHeight) {
                this.ctx.canvas.width = liveScreenwidth;
                this.ctx.canvas.height = liveScreenHeight;
                // console.log("Canvas resized to:", liveScreenwidth, liveScreenHeight);
                if (this.ctx.canvas.width < 600  && this.ctx.canvas.height < 450) {
                    this.ctx.canvas.style.transform = "rotate(90deg)";
                    // console.log("Canvas rotated to 90 degrees :" ,this.ctx.canvas.style.transform);
                }
                else 
                this.ctx.canvas.style.transform = "rotate(0deg)";
            }
        }
        private getPositions() {
            if (polling) 
                return;
            polling = true;
            
            const loop = () => {
                ws.send(JSON.stringify({ channel: "get-match-data", data: {match_id: 0} }));
                
                ws.onmessage = (event) => {
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
            ws.send(JSON.stringify({ channel: "toggle-pause-match", data: {match_id: 0} }));
            console.log("Game started");
            
        }
        private stopGame() {
            fetch(`${BASE}/stopGame/${gameid}`, { method: 'PUT' })
        }
        private moveUp(playerID: number) {
            ws.send(JSON.stringify({ channel: "move-paddle", data: { user_id:playerID , direction:"up"} }));
        }
        
        private moveDown(playerID: number) {  
            ws.send(JSON.stringify({ channel: "move-paddle", data: { user_id:playerID , direction:"down"} }));
        }
        
        private async MoveAIs(data: { ball: { ballX: number; ballY: number; ballVelocityX: number; ballVelocityY: number }; players: { Player_id: number; playerColor: string; side: string; PaddlePos: number; AI: boolean; PlayerName: string; numberOfGoals: number }[] }) {
            // console.log(data);
            
            data.players.forEach(async player =>{
                if (player.AI === true){
                    let res = await fetch(`${BASEAI}/train`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            playerID : player.PlayerName,
                            ballX: data.ball.ballX,
                            ballY: data.ball.ballY,
                            ballSpeedX: data.ball.ballVelocityX,
                            ballSpeedY: data.ball.ballVelocityY,
                            myPosition: player.PaddlePos,
                            PaddleHeight: '80',
                            myScore:    player.numberOfGoals,
                            mySide: `${player.side === 'left' ? 0.9 : 0.1}`
                        })
                    })
                    let readyRes = await res.json();
                    if (readyRes.move === 'up') {
                        // console.log(player.PlayerID);
                        this.moveUp(player.Player_id);
                    }
                    else if (readyRes.move === 'down') {
                        this.moveDown(player.Player_id);
                    }
                }
            })
            
        }
    }
    
    export default PongPage;
    