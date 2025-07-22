// client/src/theme.js
import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a202c', // Dark background
    800: '#2d3748', // Component background
    700: '#4a5568', // Borders
    blue: '#007BFF', // Primary accent
    purple: '#6F42C1', // Secondary accent
    gold: '#FFD700', // For level ups / important stats
  },
};

const theme = extendTheme({ colors });

export default theme;