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
    
    // Iterate through every possible board state.
    const points = board.space.points();
    function animate() {
        // Set the board state to that described by the next point.
        board.state = points.next().value;

        // Display the board on screen.
        drawBoard(board, configuration);
        window.requestAnimationFrame(animate);
    }
    animate();
});
