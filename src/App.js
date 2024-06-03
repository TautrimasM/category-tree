import React from 'react';
import './App.css';
import RecursiveTree from './components/RecursiveTree';
import IterativeTree from './components/IterativeTree';

function App() {
  return (
    <div className="App">
      <h1>Category Tree</h1>
      <h2>Recursive Mode</h2>
      <RecursiveTree />
      <h2>Iterative Mode</h2>
      <IterativeTree />
    </div>
  );
}

export default App;
