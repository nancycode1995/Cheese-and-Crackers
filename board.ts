/**
 * Imports.
 */
import { GraphicsConfiguration } from "./graphics-configuration.js";

/**
 * Possible states for each cell on the board.
 */
export enum Cell {
    Empty = 0,
    Cheese,
    Crackers,
}

/**
 * Represents a board state.
 */
export class Board {
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

    draw(canvas: HTMLCanvasElement, configuration: GraphicsConfiguration): void {
        // Set canvas to appropriate size.
        canvas.width = configuration.cellSize * this.dimension;
        canvas.height = configuration.cellSize * this.dimension;

        // Draw the grid.
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.strokeStyle = "black";
        for (let i = 0; i < this.dimension; i++)
            for (let j = 0; j < this.dimension; j++)
                context.strokeRect(i * configuration.cellSize, j * configuration.cellSize, configuration.cellSize, configuration.cellSize);

        // Draw the pieces.
        for (let i = 0; i < this.dimension; i++)
            for (let j = 0; j < this.dimension; j++)
                context.drawImage(configuration.images.pieces[this.getCell(i, j)], i * configuration.cellSize, j * configuration.cellSize, configuration.cellSize, configuration.cellSize);
    }
}
