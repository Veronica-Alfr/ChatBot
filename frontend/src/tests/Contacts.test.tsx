import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../pages/Contacts';
import { contactsMock } from './mocks/contactsMock';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ContactList Component', () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({
      data: contactsMock
    });
  });

  test('renders contacts and navigation buttons', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Contact />
      </MemoryRouter>
    );

    contactsMock.resource.items.forEach(async (contact) => {
      expect(await screen.findByText(contact.name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Previous'));
  });
});
