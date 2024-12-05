import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': '/src', // Assuming your src is in the root of the project
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target: 'http://localhost:7097',  // Use HTTP for the target URL
                secure: false  // Ensure the proxy doesn't expect HTTPS
            }
        },
        port: 5173,
        https: false,  // Disable HTTPS and use HTTP
    }
});
