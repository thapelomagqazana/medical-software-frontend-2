import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from './Header';

const mockStore = configureStore([]);
const renderWithProviders = (ui, { reduxState } = {}) => {
    const store = mockStore(reduxState);
    return render(
        <Provider store={store}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </Provider>
    );
};

describe('Header Component', () => {
    it('should render correctly for unauthenticated users', () => {
        renderWithProviders(<Header />, {
            reduxState: {
                auth: { isAuthenticated: false, user: null },
            },
        });

        expect(screen.getByText('HealthHub')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    it('should render correctly for authenticated users', () => {
        renderWithProviders(<Header />, {
            reduxState: {
                auth: { isAuthenticated: true, user: { name: 'John Doe' } },
            },
        });

        expect(screen.getByText('HealthHub')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Appointments')).toBeInTheDocument();
        expect(screen.getByText('Log Out')).toBeInTheDocument();
    });

    it('should handle drawer toggle', () => {
        renderWithProviders(<Header />, {
            reduxState: {
                auth: { isAuthenticated: false, user: null },
            },
        });

        const menuButton = screen.getByRole('button', { name: /menu/i });
        fireEvent.click(menuButton);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle logout', () => {
        renderWithProviders(<Header />, {
            reduxState: {
                auth: { isAuthenticated: true, user: { name: 'John Doe' } },
            },
        });

        const logoutButton = screen.getByText('Log Out');
        fireEvent.click(logoutButton);
        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    });
});
