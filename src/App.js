import './App.css';
import toast, { Toaster } from 'react-hot-toast';

export const notify = () => toast(
  (t) => (
      <div>
          Example
          <button onClick={() => toast.dismiss(t.id)} title={'close'}>
              Close
          </button>
      </div>
  )
);


function App() {
  return (
    <div className="App">
      <Toaster />
      <button onClick={notify}>Notify!</button>
    </div>
  );
}

export default App;
