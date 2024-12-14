import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';



test('filters products based on search query', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Nike' } });
  expect(screen.getByText(/Nike Air Monarch IV/i)).toBeInTheDocument();
});


