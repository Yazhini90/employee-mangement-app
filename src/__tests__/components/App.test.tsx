import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders Employee Management dashboard', () => {
  render(<App />);
  const managingApp = screen.getByText('Employee Management Dashboard');
  expect(managingApp).toBeInTheDocument();
});
