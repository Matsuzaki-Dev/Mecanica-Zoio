import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders children inside card', () => {
    render(<Card><div>Inner</div></Card>);
    expect(screen.getByText(/inner/i)).toBeInTheDocument();
  });
});
