import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IterativeNode from '../components/IterativeNode';

const mockNodes = [
  { id: 1, name: 'Root', children: [] }
];

test('renders IterativeNode and allows adding child nodes', () => {
  const addNode = jest.fn();
  render(<IterativeNode nodes={mockNodes} addNode={addNode} />);
  const addButton = screen.getByText('Add Node');
  fireEvent.click(addButton);
  const input = screen.getByPlaceholderText('New node name');
  fireEvent.change(input, { target: { value: 'Child Node' } });
  const submitButton = screen.getByText('Add');
  fireEvent.click(submitButton);
  expect(addNode).toHaveBeenCalledWith(1, 'Child Node');
});
