import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedAxios.post.mockReset();
  });

  test('successful login redirects to the home page', async () => {
    mockedAxios.post.mockResolvedValue({ status: 200 });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your API key here'), { target: { value: 'valid-api-key' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('valid-api-key');
      expect(window.location.pathname).toBe('/');
    });
  });

  test('shows error message on invalid API key', async () => {
    mockedAxios.post.mockRejectedValue({
        response: { status: 401 },
        isAxiosError: true
    });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your API key here'), { target: { value: 'invalid-api-key' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('API key is invalid')).toBeInTheDocument();
    });
  });

  test('shows error message on unexpected error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your API key here'), { target: { value: 'any-api-key' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('An unexpected error has occurred. Please try again.')).toBeInTheDocument();
    });
  });
});
