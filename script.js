"use strict";
/**
 * Board position states.
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
window.onload = function () {
    alert("Hi");
};
