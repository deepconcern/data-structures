"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _head, _size;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A data structure that is first-in-last-out (FILO).
 */
class Stack {
    /**
     * Creates a stack. Items passed in will be pushed onto the stack.
     *
     * @param items The items to push onto the stack
     */
    constructor(...items) {
        _head.set(this, void 0);
        _size.set(this, 0);
        items.forEach(item => {
            this.push(item);
        });
    }
    /**
     * Creates a stack. Items passed in will be pushed onto the stack.
     *
     * @param items The items to push onto the stack
     */
    static create(...items) {
        return new Stack(...items);
    }
    /**
     * The number of items pushed onto the stack.
     */
    get size() {
        return __classPrivateFieldGet(this, _size);
    }
    /**
     * Pushes a value on to the top of the stack.
     *
     * @param value The value to push on to the top of the stack
     * @returns This stack
     */
    push(value) {
        // If head exists, we have items in the stack, so update the references
        // as to "push" the item onto the stack. Otherwise, set create a node
        // and set head to it.
        if (__classPrivateFieldGet(this, _head)) {
            __classPrivateFieldSet(this, _head, {
                next: __classPrivateFieldGet(this, _head),
                value,
            });
        }
        else {
            __classPrivateFieldSet(this, _head, {
                value,
            });
        }
        // Regardless of the outcome, stack will always increase, so update
        // size
        __classPrivateFieldSet(this, _size, __classPrivateFieldGet(this, _size) + 1);
        return this;
    }
    /**
     * Pops a value off the top of the stack, and then removes it.
     *
     * @returns The value off the top of the stack
     */
    pop() {
        // If head is not defined, just return null
        if (!__classPrivateFieldGet(this, _head)) {
            return null;
        }
        // Get the value off the top of the stack
        const value = __classPrivateFieldGet(this, _head).value;
        // "Remove" the value from the stack (simply unset it)
        __classPrivateFieldSet(this, _head, __classPrivateFieldGet(this, _head).next);
        // Decrease the size of the stack
        __classPrivateFieldSet(this, _size, __classPrivateFieldGet(this, _size) - 1);
        return value;
    }
    /**
     * Gets the value off the top of the stack, but doesn't remove it.
     *
     * @returns The value off the top of the stack
     */
    peek() {
        // If head is not defined, just return null
        if (!__classPrivateFieldGet(this, _head)) {
            return null;
        }
        return __classPrivateFieldGet(this, _head).value;
    }
    /**
     * Returns an array representation of the stack.
     *
     * @returns An array representation of the stack
     */
    toArray() {
        const array = [];
        let cursor = __classPrivateFieldGet(this, _head);
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
    toString() {
        return this.toArray().toString();
    }
}
exports.Stack = Stack;
_head = new WeakMap(), _size = new WeakMap();
