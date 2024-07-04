import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './UserContext';


const App = () => {
    return (
        <div className="App">
            <UserProvider>
                <AppRoutes />
            </UserProvider>
        </div>
    );
};

export default App;
