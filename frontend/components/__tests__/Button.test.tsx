import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  it('renders children and responds to click', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    render(<Button onClick={handle}>Click me</Button>);
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
    await user.click(screen.getByText(/click me/i));
    expect(handle).toHaveBeenCalled();
  });
});
