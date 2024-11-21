import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { persistor, store } from './redux/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </StrictMode>
);
