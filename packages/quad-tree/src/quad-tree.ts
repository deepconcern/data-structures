type Vector = [number, number];

const isVectorInBounds = (
    [x, y]: Vector,
    boundaryX: number,
    boundaryY: number,
    boundaryWidth: number,
    boundaryHeight: number
): boolean => {
    return x >= boundaryX && x <= boundaryX + boundaryWidth && y >= boundaryY && y <= boundaryY + boundaryHeight;
};

abstract class Quad {
    #height: number;
    #width: number;
    #x: number;
    #y: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.#height = height;
        this.#width = width;
        this.#x = x;
        this.#y = y;
    }

    /**
     * The height of the quad
     */
    get height(): number {
        return this.#height;
    }

    /**
     * The size of the quad
     */
    abstract get size(): number;

    /**
     * The width of the quad
     */
    get width(): number {
        return this.#width;
    }

    /**
     * The x-coordinate of the quad
     */
    get x(): number {
        return this.#x;
    }

    /**
     * The y-coordinate of the quad
     */
    get y(): number {
        return this.#y;
    }
}

class SinglePointQuad extends Quad {
    #point: Vector;

    constructor(point: Vector, x: number, y: number, width: number, height: number) {
        super(x, y, width, height);

        this.#point = point;
    }

    /**
     * The single point within the quad
     */
    get point(): Vector {
        return this.#point;
    }

    get size(): number {
        return 1;
    }
}

class NestedQuad extends Quad {
    #bottomLeftQuad?: Quad;
    #bottomRightQuad?: Quad;
    #size = 0;
    #topLeftQuad?: Quad;
    #topRightQuad?: Quad;

    get size(): number {
        return this.#size;
    }

    addPoint(point: Vector): this {
        if (!isVectorInBounds(point, this.x, this.y, this.width, this.height)) {
            throw Error(`Point "${point}" is out of bounds`);
        }

        this.#size += 1;

        const quadHeight = this.height / 2;
        const quadWidth = this.width / 2;

        const modifyQuad = (quadX: number, quadY: number, quad?: Quad): Quad => {
            if (quad instanceof SinglePointQuad) {
                const point = quad.point;
                const nestedQuad = new NestedQuad(
                    quad.x,
                    quad.y,
                    quad.width,
                    quad.height
                );
        
                return nestedQuad.addPoint(point);
            } else if (quad instanceof NestedQuad) {
                return quad.addPoint(point);
            } else {
                return new SinglePointQuad(point, quadX, quadY, quadWidth, quadHeight);
            }
        };

        const isInTopLeftQuad = isVectorInBounds(point, this.x, this.y, quadWidth, quadHeight);
        if (isInTopLeftQuad) {
            const quadX = this.x;
            const quadY = this.y;

            this.#topLeftQuad = modifyQuad(quadX, quadY, this.#topLeftQuad);
        }

        const isInTopRightQuad = isVectorInBounds(point, this.x, this.y, quadWidth, quadHeight);
        if (isInTopRightQuad) {
            const quadX = this.x + quadWidth;
            const quadY = this.y;

            this.#topRightQuad = modifyQuad(quadX, quadY, this.#topRightQuad);
        }

        const isInBottomLeftQuad = isVectorInBounds(point, this.x, this.y, quadWidth, quadHeight);
        if (isInBottomLeftQuad) {
            const quadX = this.x;
            const quadY = this.y + quadHeight;

            this.#bottomLeftQuad = modifyQuad(quadX, quadY, this.#bottomLeftQuad);
        }

        const isInBottomRightQuad = isVectorInBounds(point, this.x, this.y, quadWidth, quadHeight);
        if (isInBottomRightQuad) {
            const quadX = this.x + quadWidth;
            const quadY = this.y + quadHeight;

            this.#bottomRightQuad = modifyQuad(quadX, quadY, this.#bottomRightQuad);
        }

        return this;
    }
}

/**
 * A quad tree.
 */
export class QuadTree {
    #height: number;
    #width: number;
    #root?: Quad;
    #size = 0;

    constructor(width: number, height: number, widthOffset = 0, heightOffset = 0) {
        if (!(height > 0)) {
            throw Error(`"height" must be a number greater than 0, got: ${height}`);
        }

        if (!(heightOffset >= 0)) {
            throw Error(`"heightOffset" must be a number greater than 0, got: ${heightOffset}`);
        }

        if (!(width > 0)) {
            throw Error(`"width" must be a number greater than 0, got: ${width}`);
        }

        if (!(widthOffset >= 0)) {
            throw Error(`"widthOffset" must be a number greater than 0, got: ${widthOffset}`);
        }

        this.#height = height;
        this.#width = width;
    }

    addPoint(point: Vector): this {
        const [x, y] = point;

        if (x < 0 || y < 0 || x > this.#width || y > this.#height) {
            return this;
        }

        this.#size += 1;

        if (this.#root instanceof NestedQuad) {
            this.#root.addPoint(point);
        } else if (this.#root instanceof SinglePointQuad) {
            const point = this.#root.point;
            const nestedQuad = new NestedQuad(
                0,
                0,
                this.width,
                this.height
            );
    
            this.#root = nestedQuad.addPoint(point);
        } else {
            this.#root = new SinglePointQuad(point, 0, 0, this.#width, this.#height);
        }

        return this;
    }

    get height(): number {
        return this.#height;
    }

    get width(): number {
        return this.#width;
    }

    get size(): number {
        return this.#size;
    }
}
