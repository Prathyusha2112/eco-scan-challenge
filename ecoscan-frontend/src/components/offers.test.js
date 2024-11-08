import { render, screen, waitFor } from '@testing-library/react';
import Offers from './Offers';
import axios from 'axios';

jest.mock('axios');

describe('Offers Component', () => {
  it('should display available offers based on eco points', async () => {
    axios.get.mockResolvedValueOnce({
      data: { available_offers: [{ name: '10% off on eco-friendly brands', points_req: 1 }] }
    });

    render(<Offers ecoPoints={10} />);

    await waitFor(() => {
      expect(screen.getByText(/10% off on eco-friendly brands/)).toBeInTheDocument();
    });
  });

  it('should show an error message if fetching offers fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch offers'));

    render(<Offers ecoPoints={10} />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching offers/)).toBeInTheDocument();
    });
  });
});

