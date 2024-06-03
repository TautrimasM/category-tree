import React, { useState, useEffect } from 'react';
import RecursiveNode from './RecursiveNode';

const RecursiveTree = () => {
  const [tree, setTree] = useState([]);

  useEffect(() => {
    fetch('/data/treeData.json')
      .then(response => response.json())
      .then(data => setTree(data));
  }, []);

  const addNode = (parentId, nodeName) => {
    const newTree = [...tree];
    const addNodeRecursively = (nodes) => {
      for (let node of nodes) {
        if (node.id === parentId) {
          node.children.push({ id: Date.now(), name: nodeName, children: [] });
          return;
        }
        if (node.children.length > 0) {
          addNodeRecursively(node.children);
        }
      }
    };
    addNodeRecursively(newTree);
    setTree(newTree);
  };

  return (
    <div>
      <RecursiveNode nodes={tree} addNode={addNode} />
    </div>
  );
};

export default RecursiveTree;
