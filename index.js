class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

const buildTree = (array, start = 0, end = array.length - 1) => {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const root = new Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const insert = (value) => {};

const deleteItem = (value) => {};

const find = (value) => {};

const levelOrder = (callback) => {};

const inOrder = (callback) => {};

const preOrder = (callback) => {};

const postOrder = (callback) => {};

const height = (node) => {};

const depth = (node) => {};

const isBalanced = () => {};

const rebalance = () => {};

// testing
const bst = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
// console.log(bst);
prettyPrint(bst.root);
