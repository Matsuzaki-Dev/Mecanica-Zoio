import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  it('renders label and accepts input', async () => {
    const user = userEvent.setup();
    render(<Input label="Name" data-testid="name-input" />);
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    await user.type(input, 'John');
    expect((input as HTMLInputElement).value).toBe('John');
  });
});
