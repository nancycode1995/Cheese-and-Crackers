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
    abstract points(): IterableIterator<T>;
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

    *points() {
        yield *this._points;
    }
}

/**
 * Unit dimension.
 */
export class Unit<T> extends Dimension<T[]> {
    constructor() {
        super(<T[][]>[[]]);
    }
}

/**
 * Recursive type.
 */
export type Exponent<T> = T[] | [T, Exponent<T>];

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

    static exponent<T>(space: Space<T>, degree: number): Space<Exponent<T>> {
        if (degree == 0)
            return new Unit<T>();
        else
            return new Product<T, Exponent<T>>(space, this.exponent(space, degree - 1));
    }

    get length(): number {
        return this.a.length * this.b.length;
    }

    *points(): Generator<[A, B], void, unknown> {
        for (let x of this.a.points())
            for (let y of this.b.points())
                yield [x, y];
    }
}
