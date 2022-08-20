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
    pieces: [] as HTMLImageElement[],
};

/**
 * Possible states for each cell on the board.
 */
enum Cell {
    Empty = 0,
    Cheese,
    Crackers,
}

class Board {
    private cells: Cell[];
    readonly dimension: number;

    constructor(cells: Cell[], dimension: number) {
        this.cells = cells;
        this.dimension = dimension;
    }

    static withDimension(dimension: number) {
        const cells = (new Array(dimension * dimension)).fill(Cell.Empty);
        return new this(cells, dimension);
    }

    getCell(x: number, y: number): Cell {
        return this.cells[x + y * this.dimension];
    }

    setCell(x: number, y: number, cell: Cell): void {
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
function drawBoard(board: Board) {
    // Set canvas to appropriate size.
    const canvas: HTMLCanvasElement = getCanvas() as HTMLCanvasElement;
    canvas.width = cellSize * board.dimension;
    canvas.height = cellSize * board.dimension;

    // Draw the grid.
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
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
async function loadImages() {
    // Load pieces images.
    const promises: Promise<void>[] = [];
    for (let url of urls.images.pieces)
        promises.push(new Promise<void>(resolve => {
            const image = new Image();
            image.onload = () => {
                resolve();
            }
            image.src = url;
            images.pieces.push(image);
        }));
    // Wait for them all to load.
    console.log("Waiting for images to load...");
    await Promise.all(promises);
    console.log("Images have been loaded.");
}

window.addEventListener("load", async event => {
    // Pre-load images.
    await loadImages();

    // Create a new 3x3 board.
    const board = Board.withDimension(3);

    // Test.
    board.setCell(0, 0, Cell.Cheese);
    board.setCell(1, 0, Cell.Crackers);

    // Display the board on screen.
    drawBoard(board);
});
