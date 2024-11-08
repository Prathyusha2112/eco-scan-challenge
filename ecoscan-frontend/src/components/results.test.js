import { render, screen, waitFor } from '@testing-library/react';
import Results from './Results';
import axios from 'axios';

jest.mock('axios');

describe('Results Component', () => {
  it('should display recognized items and eco points', async () => {
    const mockItems = [{ name: 'Shirt', carbonFootprint: 2.5 }];
    axios.get.mockResolvedValueOnce({
      data: { eco_points: 40 }
    });

    render(<Results items={mockItems} setEcoPoints={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/Recognized Items/)).toBeInTheDocument();
      expect(screen.getByText(/Shirt/)).toBeInTheDocument();
      expect(screen.getByText(/40/)).toBeInTheDocument();
    });
  });

  it('should display error if eco points fetching fails', async () => {
    const mockItems = [{ name: 'Shirt', carbonFootprint: 2.5 }];
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch eco points'));

    render(<Results items={mockItems} setEcoPoints={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching eco points/)).toBeInTheDocument();
    });
  });
});
