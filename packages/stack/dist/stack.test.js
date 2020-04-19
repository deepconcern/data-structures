"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = require("./stack");
describe('Stack.peek', () => {
    it('should return the topmost value off the stack', () => {
        const stack = new stack_1.Stack().push(1).push(2).push(3);
        expect(stack.peek()).toBe(3);
    });
    it('should return nothing if the stack is empty', () => {
        const stack = new stack_1.Stack();
        expect(stack.peek()).toBeUndefined();
    });
});
describe('Stack.pop', () => {
    it('should return the topmost value off the stack', () => {
        const stack = new stack_1.Stack().push(1).push(2).push(3);
        expect(stack.pop()).toBe(3);
    });
    it('should return nothing if the stack is empty', () => {
        const stack = new stack_1.Stack();
        expect(stack.pop()).toBeUndefined();
    });
});
describe('Stack.push', () => {
    it('should push items onto the stack', () => {
        const stack = new stack_1.Stack().push(1).push(2).push(3);
        expect(stack.size).toBe(3);
        expect(stack.pop()).toBe(3);
    });
});
