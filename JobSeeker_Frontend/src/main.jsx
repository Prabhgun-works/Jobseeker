// main.jsx

import React from 'react';                // ✅ required
import ReactDOM from 'react-dom/client'; // ✅ required
import App from './App';                 // ✅ your component
import './App.css';                    // ✅ Tailwind (or other) styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);