import { render, screen, act } from '@testing-library/react';
import { DateTime } from 'luxon';
import '@testing-library/jest-dom';

import { TimeDisplay } from '../TimeDisplay';

jest.useFakeTimers();
const mockStart = DateTime.fromISO('2023-08-04T12:09:47', { zone: 'Europe/Berlin' });

describe('TimeDisplay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockStart.toJSDate());
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders initial time correctly', () => {
    render(<TimeDisplay timezoneId="Europe/Berlin" />);
    expect(screen.getByText(mockStart.toFormat('HH:mm:ss'))).toBeInTheDocument();
  });

  it('updates time after 3 seconds', () => {
    render(<TimeDisplay timezoneId="Europe/Berlin" />);

    act(() => {
      jest.advanceTimersByTime(3000);
      jest.setSystemTime(mockStart.plus({ seconds: 3 }).toJSDate());
    });

    const expectedTime = mockStart.plus({ seconds: 3 }).toFormat('HH:mm:ss');
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });
});