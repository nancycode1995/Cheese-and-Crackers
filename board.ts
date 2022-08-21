/**
 * Imports.
 */
import { GraphicsConfiguration } from "./graphics-configuration.js";
import { Space, Dimension, Exponent, Product } from "./space.js";

/**
 * Possible states for each cell on the board.
 */
export enum Cell {
    Empty = 0,
    Cheese,
    Crackers,
}

/**
 * Dimension representing cell states.
 */
const cellSpace = new Dimension<Cell>([Cell.Empty, Cell.Cheese, Cell.Crackers]);

/**
 * Get a space representing an N by N board.
 */
function makeBoardSpace(n: number) {
    return Product.exponent(cellSpace, n * n);
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

    get space() {
        return makeBoardSpace(this.dimension);
    }

    set state(point: Exponent<Cell>) {
        for (let i = 0; point.length; i++) {
            const [value, rest] = point;
            this.cells[i] = value;
            point = rest as Exponent<Cell>;
        }
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
