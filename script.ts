/**
 * Imports.
 */
import { Cell, Board } from "./board.js";
import { GraphicsConfiguration } from "./graphics-configuration.js";

/**
 * Get the canvas element that displays the game board.
 */
function getCanvas() {
    return document.getElementById("canvas") as HTMLCanvasElement;
}

/**
 * Draw a board state on screen.
 */
function drawBoard(board: Board, configuration: GraphicsConfiguration) {
    board.draw(getCanvas(), configuration);
}

/**
 * Begin.
 */
window.addEventListener("load", async event => {
    // Setup graphics configuration and pre-load images.
    const configuration = new GraphicsConfiguration();
    console.log("Waiting for images to load...");
    await configuration.loadImages();
    console.log("Images have been loaded.");

    // Create a new 3x3 board.
    const board = Board.withDimension(3);

    // Test.
    for (let point of board.space.points())
        console.log(point);

    // Test.
    board.setCell(0, 0, Cell.Cheese);
    board.setCell(1, 0, Cell.Crackers);

    // Display the board on screen.
    drawBoard(board, configuration);
});
