/**
 * Board position states.
 */
enum Cell {
    Empty,
    Cheese,
    Crackers,
}

class Board {
    private cells: Cell[];
    private dimension: number;

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

window.onload = function() {
    alert("Hi");
};
