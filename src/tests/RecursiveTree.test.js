import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecursiveTree from '../components/RecursiveTree';
import treeData from '../../public/data/treeData.json';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(treeData),
    })
  );
});

test('renders RecursiveTree and allows adding nodes', async () => {
  render(<RecursiveTree />);

  await waitFor(() => {
    treeData.forEach(node => {
      expect(screen.getByText(node.name)).toBeInTheDocument();
    });
  });

  const addButton = screen.getAllByText('Add Node')[0];
  fireEvent.click(addButton);

  const input = screen.getByPlaceholderText('New node name');
  fireEvent.change(input, { target: { value: 'Child Node' } });

  const submitButton = screen.getByText('Add');
  fireEvent.click(submitButton);

  expect(screen.getByText('Child Node')).toBeInTheDocument();
});
