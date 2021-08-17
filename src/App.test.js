import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

function setup() {
  const { Toaster } = require('react-hot-toast');
  const toast = require('react-hot-toast').default;

  return {
    toast,
    ...render(<Toaster />)
  };
}

test('fake timeouts', async () => {
  const { toast } = setup()

  act(() => {
    toast(
      (t) => {
        console.log(t)
        return <div>
              Example
              <button onClick={() => toast.dismiss(t.id)} title={'close'}>
                Close
              </button>
          </div>
        }
    );
  })

  expect(await screen.findByText('Example')).toBeInTheDocument();
  userEvent.click(await screen.findByRole('button', { name: /close/i }))

  // All the setTimeouts that are called
  setTimeout.mock.calls.forEach(([call, timeout]) => {
    console.log(call.toString(), timeout);
  });

  // Expected: advance the setTimeout started by DISMISS_TOAST event to finish
  // And the addToRemoveQueue method to call the REMOVE_TOAST event, and delete from DOM
  // Actual: many re-renders + infinite test

  jest.advanceTimersByTime(4000);

  expect(screen.queryByText(/example/i)).not.toBeInTheDocument()
})
