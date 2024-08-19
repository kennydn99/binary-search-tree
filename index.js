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
    return -1;
  }

  //  A balanced tree is one where the difference
  // between heights of the left subtree and the right subtree of every node is not more than 1.
  isBalanced(node = this.root) {
    // Implementation of isBalanced method
    if (node === null) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    const heightDiff = Math.abs(leftHeight - rightHeight) <= 1;

    return (
      heightDiff && this.isBalanced(node.left) && this.isBalanced(node.right)
    );
  }

  rebalance() {
    // Implementation of rebalance method
    const sortedArr = [];
    this.inOrder((node) => {
      sortedArr.push(node.data);
    });

    this.root = this.buildTree(sortedArr);
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

const randomNumArray = (size) => {
  let array = [];

  while (array.length < size) {
    let randomNumber = Math.floor(Math.random() * 100);
    if (!array.includes(randomNumber)) {
      array.push(randomNumber);
    }
  }

  array.sort((a, b) => a - b); // Sort the array in ascending order
  return array;
};

// Testing
console.log("TESTING...");
console.log(
  "Creating Binary Search Tree from array of random numbers < 100..."
);

const myArray = randomNumArray(6);
console.log("Random Number Array:", myArray);

const bst = new Tree(myArray);
prettyPrint(bst.root);

console.log("Is the tree balanced? ", bst.isBalanced());

console.log("Level Order Traversal...");
bst.levelOrder((node) => {
  console.log(node.data);
});

console.log("PreOrder Traversal...");
bst.preOrder((node) => {
  console.log(node.data);
});

console.log("InOrder Traversal...");
bst.inOrder((node) => {
  console.log(node.data);
});

console.log("Post Order Traversal...");
bst.postOrder((node) => {
  console.log(node.data);
});

console.log("Unbalancing tree...");
bst.insert(123);
bst.insert(420);
bst.insert(158);
bst.insert(246);

prettyPrint(bst.root);
console.log("Is the tree balanced? ", bst.isBalanced());

console.log("Rebalancing tree...");
bst.rebalance();
prettyPrint(bst.root);

console.log("Is the tree balanced? ", bst.isBalanced());

console.log("Level Order Traversal...");
bst.levelOrder((node) => {
  console.log(node.data);
});

console.log("PreOrder Traversal...");
bst.preOrder((node) => {
  console.log(node.data);
});

console.log("InOrder Traversal...");
bst.inOrder((node) => {
  console.log(node.data);
});

console.log("Post Order Traversal...");
bst.postOrder((node) => {
  console.log(node.data);
});
