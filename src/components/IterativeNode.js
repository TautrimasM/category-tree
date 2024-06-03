import React, { useState } from 'react';

const IterativeNode = ({ nodes, addNode }) => {
  const [newNodeName, setNewNodeName] = useState('');
  const [parentId, setParentId] = useState(null);

  const handleAddNode = (id) => {
    setParentId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNodeName && parentId !== null) {
      addNode(parentId, newNodeName);
      setNewNodeName('');
      setParentId(null);
    }
  };

  const renderNodes = (nodes) => {
    const stack = [...nodes];
    const renderedNodes = [];

    while (stack.length > 0) {
      const node = stack.pop();
      renderedNodes.push(
        <li key={node.id}>
          {node.name}
          <button onClick={() => handleAddNode(node.id)}>Add Node</button>
          {node.children.length > 0 && (
            <ul>
              {renderNodes(node.children)}
            </ul>
          )}
        </li>
      );
    }

    return renderedNodes;
  };

  return (
    <ul>
      {renderNodes(nodes)}
      {parentId && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            placeholder="New node name"
          />
          <button type="submit">Add</button>
        </form>
      )}
    </ul>
  );
};

export default IterativeNode;
