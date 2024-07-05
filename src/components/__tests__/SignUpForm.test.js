import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import SignUp from '../SignUpForm';  // Ensure the path is correct
import { register } from '../../redux/authSlice'; // Ensure the path is correct

// Mock store setup
const mockStore = configureStore([]);
const store = mockStore({
  auth: { registrationSuccess: false, error: null }
});

// Mock the register action
jest.mock('../../redux/authSlice', () => ({
  register: jest.fn()
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <SignUp />
          </Router>
        </Provider>
      );
    });
  });

  test('renders the sign up form', () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Password/i).length).toBe(2);
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });

  test('displays validation errors on empty form submission', async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      // Ensure both password and confirm password error messages are displayed
      expect(screen.getAllByText(/Password is required/i).length).toBe(2);
      expect(screen.getByText(/Confirm Password is required/i)).toBeInTheDocument();
      // console.log(screen);
      // expect(screen.getByText(/Role is required/i)).toBeInTheDocument();
    });
  });

  // test('dispatches register action with form data on valid form submission', async () => {
  //   await act(async () => {
  //     fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
  //     fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
  //     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  //     fireEvent.change(screen.getAllByLabelText(/Password/i)[0], { target: { value: 'password123' } });
  //     fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
  //     fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'patient' } });
  //     fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
  //   });

  //   await waitFor(() => {
  //     expect(register).toHaveBeenCalledWith({
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'john.doe@example.com',
  //       password: 'password123',
  //       confirmPassword: 'password123',
  //       role: 'patient',
  //     });
  //   });
  // });

  // test('displays error message on registration failure', async () => {
  //   // Mock error state
  //   store.getState().auth.error = { msg: 'Registration failed' };

  //   await act(async () => {
  //     fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
  //   });
  // });
});
