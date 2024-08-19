// Node class representing each element of the Tree
class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// Tree class representing Binary Search Tree data structure of Nodes
class Tree {
  // Initializes the Tree with the buildTree method
  constructor(array) {
    if (array.length === 0) {
      this.root = null;
    } else {
      this.root = this.buildTree(array);
    }
  }
  // recursive method that creates balanced binary search tree given an ordered array
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  // Inserts a given value into the tree maintaining the existing tree structure
  insert(value) {
    // Check if root is null/the tree is empty, if true create new Node and set as root
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    // Recursive helper function that traverses the tree in order to insert the new value
    const insertNode = (root, value) => {
      if (root === null) return new Node(value);

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
  // helper function to find in order successor needed in deleteItem (next biggest node that the node to delete)
  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  deleteItem(root, value) {
    if (root === null) return root;

    if (value < root.data) {
      root.left = this.deleteItem(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteItem(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let successor = this.getSuccessor(root);
      root.data = successor.data;
      root.right = this.deleteItem(root.right, successor.data);
    }
    return root;
  }

  find(value) {
    // Implementation of find method
    let currNode = this.root;
    while (currNode !== null) {
      if (value === currNode.data) {
        return currNode;
      } else if (value < currNode.data) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    return null;
  }

  levelOrder(callback) {
    // Implementation of levelOrder traversal
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    if (this.root === null) return;

    let queue = [];

    // start at root and call callback(root)
    queue.push(this.root);
    // go to next level (left then right)
    while (queue.length > 0) {
      let removedNode = queue.shift();
      callback(removedNode);
      if (removedNode.left !== null) queue.push(removedNode.left);
      if (removedNode.right !== null) queue.push(removedNode.right);
    }
  }

  inOrder(callback, node = this.root) {
    // Implementation of inOrder traversal
    // left - root - right
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    // Implementation of preOrder traversal
    // root - left - right
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    // Implementation of postOrder traversal
    // left - right - root
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    // Implementation of height method
    if (node === null) return -1;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    // Implementation of depth method
    if (node === null) return -1;
    let edges = 0;
    let currNode = this.root;
    while (currNode != null) {
      if (node.data < currNode.data) {
        currNode = currNode.left;
        edges++;
      } else if (node.data > currNode.data) {
        currNode = currNode.right;
        edges++;
      } else {
        return edges;
      }
    }
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

  if (node === undefined) {
    console.log("This node is undefined", node);
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Testing with simple cases
const bst1 = new Tree([10, 20, 30, 40, 50, 60, 70, 80]); // Should create a small tree
bst1.insert(1);
bst1.insert(25);
bst1.insert(15);

prettyPrint(bst1.root);
console.log("Deleting 20....");
bst1.deleteItem(bst1.root, 30);
bst1.deleteItem(bst1.root, 20);
console.log("finding 10: ", bst1.find(10));
prettyPrint(bst1.root);

console.log("Level Order Traversal...");
bst1.levelOrder((node) => {
  console.log(node.data);
});
prettyPrint(bst1.root);

console.log("InOrder Traversal...");

bst1.inOrder((node) => {
  console.log(node.data);
});
prettyPrint(bst1.root);

console.log("PreOrder Traversal...");

bst1.preOrder((node) => {
  console.log(node.data);
});
prettyPrint(bst1.root);

console.log("Post Order Traversal...");

bst1.postOrder((node) => {
  console.log(node.data);
});

prettyPrint(bst1.root);
console.log("height of root: ", bst1.height(bst1.find(40)));
console.log("depth of node: ", bst1.depth(bst1.find(80)));

const bst2 = new Tree([5, 10, 15, 30]);
prettyPrint(bst2.root);

bst2.levelOrder((node) => {
  console.log(node.data);
});
