/**
 * Represent a mathematical space.
 */
export abstract class Space<T> {
    /**
     * The number of points in the space.
     */
    abstract get length(): number;

    /**
     * Iterate each point in the space.
     */
    abstract get points(): Generator<T, void, undefined>;
}

/**
 * A singular degree of freedom.
 */
export class Dimension<T> extends Space<T> {
    /**
     * The set of all points in this dimension.
     */
    private readonly _points: T[];

    constructor(points: T[]) {
        super();
        this._points = points;
    }

    get length(): number {
        return this._points.length;
    }

    get points(): Generator<T, void, undefined> {
        return (function *(points) {
            yield *points;
        })(this._points);
    }
}

/**
 * A product of spaces.
 */
export class Product<A, B> extends Space<[A, B]> {
    /**
     * The pair of spaces whose product this represents.
     */
    private readonly a: Space<A>;
    private readonly b: Space<B>;

    constructor(a: Space<A>, b: Space<B>) {
        super();
        this.a = a;
        this.b = b;
    }

    get length(): number {
        return this.a.length * this.b.length;
    }

    get points(): Generator<[A, B], void, undefined> {
        return (function *(a, b) {
            for (let x of a)
                for (let y of b)
                    yield [x, y];
        })(this.a.points, this.b.points);
    }
}
