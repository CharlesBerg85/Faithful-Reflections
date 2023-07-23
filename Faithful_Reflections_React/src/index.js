import './index.css'; // Import the global CSS styles
import App from './App'; // Import the main App component
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter for routing
import { createRoot } from 'react-dom'; // Import createRoot for rendering the app
import { StoreProvider } from 'easy-peasy'; // Import StoreProvider for providing the store
import store from './store/store'; // Import the store object

// Create the root using createRoot
const root = createRoot(document.getElementById('root'));

// Render the App component wrapped in the StoreProvider and Router
root.render(
  <StoreProvider store={store}> {/* Wrap the App component with the StoreProvider and provide the store */}
    <Router> {/* Wrap the App component with the Router for routing functionality */}
      <App /> {/* Render the main App component */}
    </Router>
  </StoreProvider>
);
