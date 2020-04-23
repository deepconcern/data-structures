/**
 * A node used to hold stack data. It contains a one-way link to the next item
 * down the stack.
 * 
 * @internal
 */
export type StackNode<TValue> = {
    /**
     * The next item down the stack
     */
    next?: StackNode<TValue>,
    /**
     * The data stored within the node
     */
    value: TValue,
};

/**
 * A last-in-first-out (LIFO) data structure.
 * 
 * @remarks
 * For more information about stacks:
 * {@link https://en.wikipedia.org/wiki/Stack_(abstract_data_type)}.
 * 
 * @typeParam TValue - The type of data the stack holds
 */
export class Stack<TValue> {
    #head?: StackNode<TValue>;
    #size = 0;

    /**
     * Creates a stack.
     * 
     * If `items` is not null, it will push items onto the stack:
     * 
     * ```
     * const stack1 = Stack<number>.create(1, 2, 3);
     * const stack2 = Stack<number>.create().push(1).push(2).push(3);
     * ```
     * 
     * Both stacks will be equal.
     * 
     * @param items - The items to push onto the stack
     * @returns A new stack
     * @typeParam TValue - The type of data the stack holds
     */
    static create<TValue>(...items: TValue[]): Stack<TValue> {
        return new Stack(...items);
    }

    /**
     * Creates a stack.
     * 
     * If `items` is not null, it will push items onto the stack:
     * 
     * ```
     * const stack1 = new Stack<number>(1, 2, 3);
     * const stack2 = new Stack<number>().push(1).push(2).push(3);
     * ```
     * 
     * Both stacks will be equal.
     * 
     * @param items - The items to push onto the stack
     */
    constructor(...items: TValue[]) {
        items.forEach(item => {
            this.push(item);
        });
    }

    /**
     * The number of items pushed onto the stack.
     */
    get size(): number {
        return this.#size;
    }

    /**
     * Returns a value off the top of the stack without modifying the stack.
     * 
     * ```
     * const stack = new Stack(1, 2, 3);
     * 
     * console.log(stack.peek()); // 3
     * console.log(stack.size); // 3
     * ```
     * 
     * @returns The value off the top of the stack
     */
    peek(): TValue | null {
        // If head is not defined, just return null
        if (!this.#head) {
            return null;
        }

        return this.#head.value;
    }

    /**
     * Pops a value off the top of the stack, and then removes it.
     * 
     * ```
     * const stack = new Stack(1, 2, 3);
     * 
     * console.log(stack.pop()); // 3
     * console.log(stack.size); // 2
     * ```
     * 
     * @returns The value off the top of the stack
     */
    pop(): TValue | null {
        // If head is not defined, just return null
        if (!this.#head) {
            return null;
        }

        // Get the value off the top of the stack
        const value = this.#head.value;

        // "Remove" the value from the stack (simply unset it)
        this.#head = this.#head.next;

        // Decrease the size of the stack
        this.#size -= 1;

        return value;
    }

    /**
     * Pushes a value on to the top of the stack.
     * 
     * Since `push` returns `this`, multiple `push` commands can be chained:
     * 
     * ```
     * const stack = new Stack<number>();
     * 
     * stack.push(1).push(2).push(3);
     * ```
     * 
     * @param value - The value to push on to the top of the stack
     * @returns This stack
     */
    push(value: TValue): this {
        // If head exists, we have items in the stack, so update the references
        // as to "push" the item onto the stack. Otherwise, set create a node
        // and set head to it.
        if (this.#head) {
            this.#head = {
                next: this.#head,
                value,
            };
        } else {
            this.#head = {
                value,
            };
        }

        // Regardless of the outcome, stack will always increase, so update
        // size
        this.#size += 1;

        return this;
    }

    /**
     * Returns an array representation of the stack.
     * 
     * @returns An array representation of the stack
     */
    toArray(): TValue[] {
        const array: TValue[] = [];

        let cursor = this.#head;

        // Travel through the stack nodes, pushing values to the array
        while (cursor) {
            array.push(cursor.value);
            cursor = cursor.next;
        }

        return array;
    }

    /**
     * Returns a string representation of the stack.
     * 
     * @returns A string representation of the stack
     */
    toString(): string {
        return this.toArray().toString();
    }
}