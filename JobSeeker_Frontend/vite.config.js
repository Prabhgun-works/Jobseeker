import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No need to import Tailwind plugin here

  export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };