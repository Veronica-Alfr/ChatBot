import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Messages from '../pages/Message';
import { messagesMock } from './mocks/messagesMock';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Messages Component', () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({
      data: messagesMock
    });
  });

  test('renders messages correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/contact/user@blip.com']}>
        <Routes>
          <Route path="/contact/:contactId" element={<Messages />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Hello, how can I help you today?')).toBeInTheDocument();
    expect(await screen.findByText('I need help with my account.')).toBeInTheDocument();
  });
});
