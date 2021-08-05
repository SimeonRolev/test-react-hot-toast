import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster } from 'react-hot-toast';
import { notify } from './App';

test('closes notification', async () => {
  render(<Toaster />);
  notify()
  const message = await screen.findByText('Example');
  expect(message).toBeInTheDocument();

  const closeButton = await screen.findByRole('button', { name: /close/i })
  userEvent.click(closeButton)
  await waitFor(() => {
    console.log('retry')
    expect(screen.queryByText(/example/i)).not.toBeInTheDocument()
  }, { timeout: 10000 })
}, 12000);
