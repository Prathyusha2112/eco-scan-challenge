import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload from './FileUpload';
import axios from 'axios';

jest.mock('axios');

describe('FileUpload Component', () => {
  it('should allow a user to upload an image', async () => {
    axios.post.mockResolvedValueOnce({
      data: { recognized_items: [{ name: 'Shirt', carbonFootprint: 2.5 }] }
    });

    render(<FileUpload onUpload={() => {}} />);
    
    const fileInput = screen.getByLabelText(/Select Image/i);
    const file = new File(['test'], 'test_shirt.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Upload/i);
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/analyze-image/', expect.any(FormData));
    });
  });

  it('should display an error message when the upload fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Upload failed'));

    render(<FileUpload onUpload={() => {}} />);

    const fileInput = screen.getByLabelText(/Select Image/i);
    const file = new File(['test'], 'test_unknown.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const uploadButton = screen.getByText(/Upload/i);
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to upload image')).toBeInTheDocument();
    });
  });
});
