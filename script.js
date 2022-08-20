var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Imports.
 */
import { Cell, Board } from "./board.js";
import { GraphicsConfiguration } from "./graphics-configuration.js";
/**
 * Get the canvas element that displays the game board.
 */
function getCanvas() {
    return document.getElementById("canvas");
}
/**
 * Draw a board state on screen.
 */
function drawBoard(board, configuration) {
    board.draw(getCanvas(), configuration);
}
/**
 * Begin.
 */
window.addEventListener("load", (event) => __awaiter(void 0, void 0, void 0, function* () {
    // Setup graphics configuration and pre-load images.
    const configuration = new GraphicsConfiguration();
    console.log("Waiting for images to load...");
    yield configuration.loadImages();
    console.log("Images have been loaded.");
    // Create a new 3x3 board.
    const board = Board.withDimension(3);
    // Test.
    board.setCell(0, 0, Cell.Cheese);
    board.setCell(1, 0, Cell.Crackers);
    // Display the board on screen.
    drawBoard(board, configuration);
}));
