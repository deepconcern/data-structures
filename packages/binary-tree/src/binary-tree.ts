import { Stack } from '@deepconcern/stack';

export type BinaryTreeNode<TValue> = {
    right?: BinaryTreeNode<TValue>,
    left?: BinaryTreeNode<TValue>,
    score: number,
    value: TValue,
}

/**
 * A function used when scoring items during insert in a binary tree.
 */
export type ScoringFunction<TValue> = (value: TValue) => number;

/**
 * A tree where each node has an optional left and right node.
 */
export class BinaryTree<TValue> {
    #height = 0;
    #root?: BinaryTreeNode<TValue>;
    #scoringFunction: ScoringFunction<TValue>;
    #size = 0;

    /**
     * @param scoringFunction The function used to determine an items score.
     */
    constructor(scoringFunction: ScoringFunction<TValue>) {
        this.#scoringFunction = scoringFunction;
    }

    /**
     * The height of the tree. This is the number of nodes from root until the
     * end of the longest branch.
     */
    get height(): number {
        return this.#height;
    }

    /**
     * The number of items in the tree.
     */
    get size(): number {
        return this.#size;
    }

    /**
     * Adds an item into the tree. Uses the tree's sorting function to
     * determine the items position in the tree. Returns the score of the item.
     * 
     * @param value The item to add
     * @returns The score of the item
     */
    addItem(value: TValue): number {
        // Get the score of the value, so the tree knows where to place it
        const score = this.#scoringFunction(value);

        // R
        this.#size += 1;

        if (!this.#root) {
            // The tree is empty, so we just make the root node the value
            this.#root = {
                score,
                value,
            };

            // Since this is the only item, the height will be 1
            this.#height = 1;
        } else {
            let cursor = this.#root;
            let currentHeight = 1;

            while (cursor) {
                currentHeight += 1;
                if (score < cursor.score) {
                    if (cursor.left) {
                        cursor = cursor.left;
                    } else {
                        cursor.left = {
                            value,
                            score,
                        };
                        break;
                    }
                } else if (score > cursor.score) {
                    if (cursor.right) {
                        cursor = cursor.right;
                    } else {
                        cursor.right = {
                            value,
                            score,
                        };
                        break;
                    }
                } else {
                    // In this case we already have added the item, so we abort
                    break;
                }
            }

            this.#height = Math.max(this.#height, currentHeight);
        }
        return score;
    }

    getItem(score: number): TValue | null {
        let cursor = this.#root;

        while (cursor) {
            if (score < cursor.score) {
                cursor = cursor.left;
            } else if (score > cursor.score) {
                cursor = cursor.right;
            } else {
                return cursor.value;
            }
        }

        return null;
    }

    getMaxValue(): TValue | null {
        let cursor = this.#root;

        while(cursor) {
            if (cursor.right) {
                cursor = cursor.right;
            } else {
                return cursor.value;
            }
        }

        return null;
    }

    getMinValue(): TValue | null {
        let cursor = this.#root;

        while(cursor) {
            if (cursor.left) {
                cursor = cursor.left;
            } else {
                return cursor.value;
            }
        }

        return null;
    }

    equals(other: unknown): boolean {
        if (!(other instanceof BinaryTree)) {
            return false;
        }

        if (this.size !== other.size) {
            return false;
        }
        
        const nodeStack = new Stack<[BinaryTreeNode<TValue> | undefined, BinaryTreeNode<TValue> | undefined]>();
        nodeStack.push([this.#root, other.#root]);

        let maxRetries = 500;

        while(nodeStack.size !== 0 && maxRetries > 0) {
            maxRetries--;
            const currentNodes = nodeStack.pop();

            if (!currentNodes) {
                continue;
            }

            const [thisNode, otherNode] = currentNodes;

            if (!thisNode) {
                if (otherNode) {
                    return false;
                }
                continue;
            } else {
                if (!otherNode) {
                    return false;
                }
            }

            if (thisNode.score !== otherNode.score) {
                return false;
            }

            nodeStack.push([thisNode.left, otherNode.left]).push([thisNode.right, otherNode.right]);
        }

        return true;
    }

    postOrderTraversal(traversalFunction: (value: TValue) => void): void {
        if (!this.#root) {
            return;
        }

        const nodesToProcess = new Stack<BinaryTreeNode<TValue>>();

        let cursor: BinaryTreeNode<TValue> | undefined = this.#root;

        while (nodesToProcess.size > 0) {
            if (cursor) {
                if (cursor.right) {
                    nodesToProcess.push(cursor.right);
                }
                nodesToProcess.push(cursor);
                cursor = cursor.left;
            } else {
                const nodeToProcess = nodesToProcess.pop();

                // Shouldn't get here
                if (!nodeToProcess) {
                    throw Error('Stack is empty');
                }

                traversalFunction(nodeToProcess.value);

                cursor = nodeToProcess.right;
            }
        }
    }
    
    postOrderValues(): TValue[] {
        const values: TValue[] = [];

        this.postOrderTraversal(value => values.push(value));

        return values;
    }

    toString(): string {
        return JSON.stringify(this.#root);
    }
}