import { Stack } from './stack';

describe('Stack.peek', () => {
    it('should return the topmost value off the stack', () => {
        const stack = new Stack<number>().push(1).push(2).push(3);
        expect(stack.peek()).toBe(3);
    });

    it('should return nothing if the stack is empty', () => {
        const stack = new Stack<number>();
        expect(stack.peek()).toBeNull();
    });
});

describe('Stack.pop', () => {
    it('should return the topmost value off the stack', () => {
        const stack = new Stack<number>().push(1).push(2).push(3);
        expect(stack.pop()).toBe(3);
    });

    it('should return nothing if the stack is empty', () => {
        const stack = new Stack<number>();
        expect(stack.pop()).toBeNull();
    });
});

describe('Stack.push', () => {
    it('should push items onto the stack', () => {
        const stack = new Stack<number>().push(1).push(2).push(3);
        expect(stack.size).toBe(3);
        expect(stack.pop()).toBe(3);
    });
});