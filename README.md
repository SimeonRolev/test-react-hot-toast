1. `npm run start`. There is a button to create a notification. Clicking it renders one. Close button closes it. After some seconds, the notification disappears from the DOM.

2. `npm run test -- --verbose=false`. Running a simple test with React Testing Library that tests if the Close button actually removes the notification from the DOM. Even with pumped up timeouts - it doesn't.
