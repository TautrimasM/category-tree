import React, { useState } from 'react';

const RecursiveNode = ({ nodes, addNode }) => {
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

  return (
    <ul>
      {nodes.map(node => (
        <li key={node.id}>
          {node.name}
          <button onClick={() => handleAddNode(node.id)}>Add Node</button>
          {node.children.length > 0 && (
            <RecursiveNode nodes={node.children} addNode={addNode} />
          )}
        </li>
      ))}
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

export default RecursiveNode;
