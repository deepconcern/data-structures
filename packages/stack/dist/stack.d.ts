/**
 * A node used to hold stack data. It contains a one-way link to the next item
 * down the stack.
 */
export declare type StackNode<TValue> = {
    /**
     * The next item down the stack
     */
    next?: StackNode<TValue>;
    /**
     * The data stored within the node
     */
    value: TValue;
};
/**
 * A data structure that is first-in-last-out (FILO).
 */
export declare class Stack<TValue> {
    #private;
    /**
     * Creates a stack. Items passed in will be pushed onto the stack.
     *
     * @param items The items to push onto the stack
     */
    static create<TValue>(...items: TValue[]): Stack<TValue>;
    /**
     * Creates a stack. Items passed in will be pushed onto the stack.
     *
     * @param items The items to push onto the stack
     */
    constructor(...items: TValue[]);
    /**
     * The number of items pushed onto the stack.
     */
    get size(): number;
    /**
     * Pushes a value on to the top of the stack.
     *
     * @param value The value to push on to the top of the stack
     * @returns This stack
     */
    push(value: TValue): this;
    /**
     * Pops a value off the top of the stack, and then removes it.
     *
     * @returns The value off the top of the stack
     */
    pop(): TValue | null;
    /**
     * Gets the value off the top of the stack, but doesn't remove it.
     *
     * @returns The value off the top of the stack
     */
    peek(): TValue | null;
    /**
     * Returns an array representation of the stack.
     *
     * @returns An array representation of the stack
     */
    toArray(): TValue[];
    /**
     * Returns a string representation of the stack.
     *
     * @returns A string representation of the stack
     */
    toString(): string;
}
