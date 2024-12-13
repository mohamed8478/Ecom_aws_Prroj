import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mocking the components and data
jest.mock('../Navigation/Nav', () => () => <div>Navigation Component</div>);
jest.mock('../Products/Products', () => ({ result }) => (
  <div>
    {result.map((product, index) => (
      <div key={index} data-testid="product">
        {product.props.title}
      </div>
    ))}
  </div>
));
jest.mock('../Recommended/Recommended', () => () => <div>Recommended Component</div>);
jest.mock('../Sidebar/Sidebar', () => ({ handleChange }) => (
  <button onClick={() => handleChange({ target: { value: 'category1' } })}>Filter</button>
));
jest.mock('../db/data', () => [
  { title: 'Product 1', category: 'category1' },
  { title: 'Product 2', category: 'category2' },
  // Add more products as needed
]);
jest.mock('../components/Card', () => ({ img, title, star, reviews, prevPrice, newPrice }) => (
  <div>{title}</div>
));

test('renders the App component', () => {
  render(<App />);
  expect(screen.getByText('Navigation Component')).toBeInTheDocument();
  expect(screen.getByText('Recommended Component')).toBeInTheDocument();
  expect(screen.getByText('Filter')).toBeInTheDocument();
});

test('filters products based on search query', () => {
  render(<App />);

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Product 1' } });

  const products = screen.getAllByTestId('product');
  expect(products).toHaveLength(1);
  expect(products[0]).toHaveTextContent('Product 1');
});

test('filters products based on category selection', () => {
  render(<App />);

  const filterButton = screen.getByText('Filter');
  fireEvent.click(filterButton);

  const products = screen.getAllByTestId('product');
  expect(products).toHaveLength(1);
  expect(products[0]).toHaveTextContent('Product 1');
});
