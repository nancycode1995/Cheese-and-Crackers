"use strict";
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
 * Graphics configuration.
 */
const cellSize = 48; // Size in pixels of a cell square.
/**
 * Resource URLs
 */
const urls = {
    images: {
        pieces: ["res/empty.png", "res/cheese.png", "res/crackers.png"],
    },
};
/**
 * Globally accessible resources.
 */
const images = {
    pieces: [],
};
/**
 * Possible states for each cell on the board.
 */
var Cell;
(function (Cell) {
    Cell[Cell["Empty"] = 0] = "Empty";
    Cell[Cell["Cheese"] = 1] = "Cheese";
    Cell[Cell["Crackers"] = 2] = "Crackers";
})(Cell || (Cell = {}));
class Board {
    constructor(cells, dimension) {
        this.cells = cells;
        this.dimension = dimension;
    }
    static withDimension(dimension) {
        const cells = (new Array(dimension * dimension)).fill(Cell.Empty);
        return new this(cells, dimension);
    }
    getCell(x, y) {
        return this.cells[x + y * this.dimension];
    }
    setCell(x, y, cell) {
        this.cells[x + y * this.dimension] = cell;
    }
}
/**
 * Get the canvas element that displays the game board.
 */
function getCanvas() {
    return document.getElementById("canvas");
}
/**
 * Draw a board state on screen.
 */
function drawBoard(board) {
    // Set canvas to appropriate size.
    const canvas = getCanvas();
    canvas.width = cellSize * board.dimension;
    canvas.height = cellSize * board.dimension;
    // Draw the grid.
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    for (let i = 0; i < board.dimension; i++)
        for (let j = 0; j < board.dimension; j++)
            context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
    // Draw the pieces.
    for (let i = 0; i < board.dimension; i++)
        for (let j = 0; j < board.dimension; j++)
            context.drawImage(images.pieces[board.getCell(i, j)], i * cellSize, j * cellSize, cellSize, cellSize);
}
/**
 * Load all of the image assets into a global array.
 */
function loadImages() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load pieces images.
        const promises = [];
        for (let url of urls.images.pieces)
            promises.push(new Promise(resolve => {
                const image = new Image();
                image.onload = () => {
                    resolve();
                };
                image.src = url;
                images.pieces.push(image);
            }));
        // Wait for them all to load.
        console.log("Waiting for images to load...");
        yield Promise.all(promises);
        console.log("Images have been loaded.");
    });
}
window.addEventListener("load", (event) => __awaiter(void 0, void 0, void 0, function* () {
    // Pre-load images.
    yield loadImages();
    // Create a new 3x3 board.
    const board = Board.withDimension(3);
    // Test.
    board.setCell(0, 0, Cell.Cheese);
    board.setCell(1, 0, Cell.Crackers);
    // Display the board on screen.
    drawBoard(board);
}));
