import { BinaryTree, BinaryTreeNode } from './binary-tree';

it("should construct a binary tree with the given scoring function", () => {
    const numberTree = new BinaryTree<number>(v => v);
    numberTree.addItem(1);
    numberTree.addItem(3);
    numberTree.addItem(2);

    const numberTreeExpected: BinaryTreeNode<number> = {
        right: {
            left: {
                score: 2,
                value: 2,
            },
            score: 3,
            value: 3
        },
        score: 1,
        value:1,
    };

    expect(JSON.parse(numberTree.toString())).toEqual(numberTreeExpected);

    const stringTree = new BinaryTree<string>(v => v.length);
    stringTree.addItem('foo');
    stringTree.addItem('a');
    stringTree.addItem('bb');

    const stringTreeExpected: BinaryTreeNode<string> = {
        left: {
            right: {
                score: 2,
                value: 'bb',
            },
            score: 1,
            value: 'a'
        },
        score: 3,
        value: 'foo',
    };

    expect(JSON.parse(stringTree.toString())).toEqual(stringTreeExpected);
});

describe("BinaryTree.addItem", () => {
    it("should get the size of the binary tree", () => {
        const tree = new BinaryTree<number>(v => v);
        tree.addItem(5);
        tree.addItem(1);
        tree.addItem(6);
        tree.addItem(2);

        const treeExpected: BinaryTreeNode<number> = {
            right: {
                score: 6,
                value: 6
            },
            left: {
                right: {
                    score: 2,
                    value: 2,
                },
                score: 1,
                value: 1,
            },
            score: 5,
            value:5,
        };
    
        expect(JSON.parse(tree.toString())).toEqual(treeExpected);
    });
});

describe("BinaryTree.equals", () => {
    it("should return true if two trees are structurally equal and have the same items", () => {
        const aTree = new BinaryTree<number>(v => v)
        aTree.addItem(5);
        aTree.addItem(1);
        aTree.addItem(2);
        aTree.addItem(7);
        aTree.addItem(6);
        const bTree = new BinaryTree<number>(v => v)
        bTree.addItem(5);
        bTree.addItem(1);
        bTree.addItem(2);
        bTree.addItem(7);
        bTree.addItem(6);
        const cTree = new BinaryTree<number>(v => v)
        cTree.addItem(5);
        cTree.addItem(2);
        cTree.addItem(1);
        cTree.addItem(7);
        cTree.addItem(6);
        const dTree = new BinaryTree<number>(v => v);
        const eTree = new BinaryTree<number>(v => v);

        expect(aTree.equals(bTree)).toBe(true);
        expect(aTree.equals(cTree)).toBe(false);
        expect(dTree.equals(eTree)).toBe(true);
    });
});

describe("BinaryTree.height", () => {
    it("should be 0 if the tree is empty", () => {
        const tree = new BinaryTree<number>(v => v);

        expect(tree.height).toBe(0);
    });

    it("should get the height of the tree", () => {
        const tree = new BinaryTree<number>(v => v);
        tree.addItem(5);
        tree.addItem(1);
        tree.addItem(6);
        tree.addItem(2);
        tree.addItem(7);
        tree.addItem(3);

        expect(tree.height).toBe(4);
    });
});

describe("BinaryTree.size", () => {
    it("should get the size of the binary tree", () => {
        const tree = new BinaryTree<number>(v => v);
        tree.addItem(5);
        tree.addItem(1);
        tree.addItem(6);
        tree.addItem(2);

        expect(tree.size).toBe(4);
    });
});