/**
 * Imports.
 */
import { Cell, Board } from "./board.js";
import { GraphicsConfiguration } from "./graphics-configuration.js";

/**
 * Global state.
 */
let board: Board;
let configuration: GraphicsConfiguration;

/**
 * Draw the current board state and available choice.
 */
function draw() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const choices = document.getElementById("choices") as HTMLDivElement;
    board.draw(canvas, configuration);
    choices.replaceChildren(...[...board.choices].map((choice: Board): HTMLCanvasElement => {
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        canvas.onclick = (event) => {
            board = choice;
            draw();
        }
        choice.draw(canvas, configuration, true);
        return canvas;
    }))
}

/**
 * Initialize a game.
 */
function startGame(dimension: number = 3) {
    // Create a new 3x3 board and draw it.
    board = Board.withDimension(dimension);
    draw();
}

/**
 * Begin.
 */
window.addEventListener("load", async event => {
    // Setup graphics configuration and pre-load images.
    configuration = new GraphicsConfiguration();
    console.log("Waiting for images to load...");
    await configuration.loadImages();
    console.log("Images have been loaded.");

    // Start a new game.
    startGame();
});
