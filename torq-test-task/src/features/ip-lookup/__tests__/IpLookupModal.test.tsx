import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IpLookupModal } from '../IpLookupModal';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('IpLookupModal', () => {
  const defaultProps = {
    isOpen: true,
    handleClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal and header', () => {
    render(<IpLookupModal {...defaultProps} />);
    expect(screen.getByTestId('modal-container')).toBeInTheDocument();
    expect(screen.getByTestId('modal-name')).toHaveTextContent('IP Lookup');
  });

  it('do not add a new input when Add button is clicked when disabled', () => {
    render(<IpLookupModal {...defaultProps} />);
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    const inputs = screen.getAllByTestId('ip-input');
    expect(inputs.length).toBe(1);
  });

  it('calls API and shows flag + timezone on valid IP blur', async () => {
    const mockResponse = {
      data: {
        success: true,
        country_code: 'US',
        timezone: {
          id: 'America/New_York',
        },
      },
    };

    mockAxios.get.mockResolvedValue(mockResponse);

    render(<IpLookupModal {...defaultProps} />);

    const input = screen.getByTestId('ip-input');
    fireEvent.change(input, { target: { value: '8.8.8.8' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('https://ipwho.is/8.8.8.8');
    });

    expect(await screen.findByTestId('flag-image')).toHaveAttribute(
      'src',
      'https://flagcdn.com/us.svg'
    );
    expect(await screen.findByText(/:/)).toBeInTheDocument();
  });

  it('shows warning toast on invalid API response', async () => {
    mockAxios.get.mockResolvedValue({ data: { success: false } });

    render(<IpLookupModal {...defaultProps} />);

    const input = screen.getByTestId('ip-input');
    fireEvent.change(input, { target: { value: '8.8.8.8' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalled();
    });
  });

  it('shows error toast on axios failure', async () => {
    mockAxios.get.mockRejectedValue(new Error('Network Error'));

    render(<IpLookupModal {...defaultProps} />);

    const input = screen.getByTestId('ip-input');
    fireEvent.change(input, { target: { value: '1.1.1.1' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('disables Add button if last input is invalid', () => {
    render(<IpLookupModal {...defaultProps} />);

    const input = screen.getByTestId('ip-input');
    fireEvent.change(input, { target: { value: 'invalid-ip' } });

    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeDisabled();
  });
});