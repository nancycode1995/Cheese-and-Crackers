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
    private turn: number;

    constructor(cells: Cell[], dimension: number, turn: number = 0) {
        this.cells = [...cells];
        this.dimension = dimension;
        this.turn = turn;
    }

    get winner() {
        for (let player of [Cell.Cheese, Cell.Crackers]) {
            // Check for horizontal wins.
            for (let i = 0; i < this.cells.length; i += this.dimension) {
                let matches = true;
                for (let j = 0; j < this.dimension; j++) {
                    if (this.cells[i + j] != player) {
                        matches = false;
                        break;
                    }
                }
                if (matches)
                    return player;
            }
            // Check for vertical wins.
            for (let i = 0; i < this.dimension; i++) {
                let matches = true;
                for (let j = 0; j < this.cells.length; j += this.dimension) {
                    if (this.cells[i + j] != player) {
                        matches = false;
                        break;
                    }
                }
                if (matches)
                    return player;
            }
            // Check for diagonal wins.
            {
                let matches = true;
                for (let i = 0; i < this.cells.length; i += this.dimension + 1) {
                    if (this.cells[i] != player) {
                        matches = false;
                        break;
                    }
                }
                if (matches)
                    return player;
            }
            {
                let matches = true;
                for (let i = this.dimension - 1; i < this.cells.length; i += this.dimension - 1) {
                    if (this.cells[i] != player) {
                        matches = false;
                        break;
                    }
                }
                if (matches)
                    return player;
            }
        }
        return null;
    }

    get choices() {
        const player = this.turn % 2 ? Cell.Crackers : Cell.Cheese;
        return (function *(board) {
            if (board.winner == null) {
                for (let i = 0; i < board.cells.length; i++) {
                    if (board.cells[i] == Cell.Empty) {
                        const next = new Board(board.cells, board.dimension, board.turn + 1);
                        next.cells[i] = player;
                        yield next;
                    }
                }
            }
        })(this);
    }

    get chances(): [number, number, number] {
        switch (this.winner) {
            case Cell.Cheese:
                return [1, 0, 0];
            case Cell.Crackers:
                return [0, 1, 0];
            default: {
                const choices = [...this.choices];
                if (choices.length) {
                    let [win, lose, draw] = [0, 0, 0];
                    for (let choice of choices) {
                        const chances = choice.chances;
                        win += chances[0];
                        lose += chances[1];
                        draw += chances[2];
                    }
                    return [win / choices.length, lose / choices.length, draw / choices.length];
                } else
                    return [0, 0, 1];
            }
        }
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

    draw(canvas: HTMLCanvasElement, configuration: GraphicsConfiguration, small: boolean = false): void {
        // Appropriate cell size depending on whether this should be small or not.
        const cellSize = small ? configuration.cellSizeSmall : configuration.cellSize;

        // Set canvas to appropriate size.
        canvas.width = cellSize * this.dimension;
        canvas.height = cellSize * this.dimension + configuration.footerSize;

        // Draw the grid.
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.strokeStyle = "black";
        for (let i = 0; i < this.dimension; i++)
            for (let j = 0; j < this.dimension; j++)
                context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);

        // Draw the footer.
        const xFooter = 0;
        const yFooter = cellSize * this.dimension;
        const widthFooter = cellSize * this.dimension;
        const heightFooter = configuration.footerSize;
        const [winChance, loseChance, drawChance] = this.chances;
        context.fillStyle = "#0f0";
        context.fillRect(xFooter, yFooter, widthFooter * winChance, heightFooter);
        context.fillStyle = "#aaa";
        context.fillRect(xFooter + widthFooter * winChance, yFooter, widthFooter * drawChance, heightFooter);
        context.fillStyle = "#f00";
        context.fillRect(xFooter + widthFooter - widthFooter * loseChance, yFooter, widthFooter * loseChance, heightFooter);
        context.strokeRect(xFooter, yFooter, widthFooter, heightFooter);

        // Draw the pieces.
        for (let i = 0; i < this.dimension; i++)
            for (let j = 0; j < this.dimension; j++)
                context.drawImage(configuration.images.pieces[this.getCell(i, j)], i * cellSize, j * cellSize, cellSize, cellSize);
    }
}
