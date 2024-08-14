class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(value) {
    // Implementation of insert method
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    const insertNode = (root, value) => {
      if (!root) return new Node(value);

      if (root.data === value) return root;

      if (value < root.data) {
        root.left = insertNode(root.left, value);
      } else {
        root.right = insertNode(root.right, value);
      }

      return root;
    };

    this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
    // delete leaf
    // delete node with single child
    // delete node with two children
  }

  find(value) {
    // Implementation of find method
  }

  levelOrder(callback) {
    // Implementation of levelOrder traversal
  }

  inOrder(callback) {
    // Implementation of inOrder traversal
  }

  preOrder(callback) {
    // Implementation of preOrder traversal
  }

  postOrder(callback) {
    // Implementation of postOrder traversal
  }

  height(node) {
    // Implementation of height method
  }

  depth(node) {
    // Implementation of depth method
  }

  isBalanced() {
    // Implementation of isBalanced method
  }

  rebalance() {
    // Implementation of rebalance method
  }
}

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

// testing
const bst = new Tree([10, 20, 30, 100, 500]);

bst.insert(40);
bst.insert(5);
bst.insert(450);
bst.insert(451);

prettyPrint(bst.root);
