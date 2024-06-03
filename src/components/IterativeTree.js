import React, { useState, useEffect } from 'react';
import IterativeNode from './IterativeNode';

const IterativeTree = () => {
  const [tree, setTree] = useState([]);

  useEffect(() => {
    fetch('/data/treeData.json')
      .then(response => response.json())
      .then(data => setTree(data));
  }, []);

  const addNode = (parentId, nodeName) => {
    const newTree = [...tree];
    const stack = [...newTree];

    while (stack.length > 0) {
      const node = stack.pop();
      if (node.id === parentId) {
        node.children.push({ id: Date.now(), name: nodeName, children: [] });
        break;
      }
      stack.push(...node.children);
    }

    setTree(newTree);
  };

  return (
    <div>
      <IterativeNode nodes={tree} addNode={addNode} />
    </div>
  );
};

export default IterativeTree;
