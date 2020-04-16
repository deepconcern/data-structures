export type StackNode<TValue> = {
    next?: StackNode<TValue>,
    prev?: StackNode<TValue>,
    value: TValue,
};

/**
 * A data structure that is first-in-last-out (FILO).
 */
export class Stack<TValue> {
    #head?: StackNode<TValue>;
    #size = 0;

    /**
     * Pushes a value on to the top of the stack.
     * 
     * @param value The value to push on to the top of the stack
     */
    push(value: TValue): this {
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

        this.#size += 1;

        return this;
    }

    /**
     * Pops a value off the top of the stack.
     */
    pop(): TValue | null {
        if (!this.#head) {
            return null;
        }

        const value = this.#head.value;

        this.#head = this.#head.next;

        this.#size -= 1;

        return value;
    }

    /**
     * Gets the topmost value of the stack (without modifying the stack).
     */
    peek(): TValue | null {
        if (!this.#head) {
            return null;
        }

        return this.#head.value;
    }

    /**
     * Gets the number of items pushed onto the stack.
     */
    get size(): number {
        return this.#size;
    }
}