import { ThemeProvider } from '@mui/material';
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { theme } from './theme/theme';
import { UserProvider } from './UserContext';


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <UserProvider>
                    <AppRoutes />
                </UserProvider>
            </div>
        </ThemeProvider>
    );
};

export default App;
