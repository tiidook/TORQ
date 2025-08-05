import { render, screen, fireEvent } from '@testing-library/react';
import { IpLookup } from '../IpLookup';

describe('IpLookup', () => {
  it('renders open button', () => {
    render(<IpLookup />);
    const openButton = screen.getByRole('button', { name: /open ip lookup/i });
    expect(openButton).toBeInTheDocument();
  });

  it('opens modal when button is clicked', () => {
    render(<IpLookup />);
    const openButton = screen.getByRole('button', { name: /open ip lookup/i });
    fireEvent.click(openButton);

    const modalTitle = screen.getByTestId('modal-name');
    expect(modalTitle).toBeInTheDocument();
    expect(modalTitle).toHaveTextContent('IP Lookup');
  });

  it('closes modal when CloseIcon is clicked', () => {
    render(<IpLookup />);

    const openButton = screen.getByRole('button', { name: /open ip lookup/i });
    fireEvent.click(openButton);

    const closeIcon = screen.getByTestId('close-icon'); // обязательно добавь этот data-testid
    fireEvent.click(closeIcon);

    expect(screen.queryByTestId('modal-container')).not.toBeInTheDocument();
  });
});
