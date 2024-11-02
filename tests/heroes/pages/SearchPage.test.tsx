import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { SearchPage } from '../../../src/heroes/pages';

const useNavigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => useNavigateMock,
}));

describe('Testing SearchPage', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should render correctly with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('should show Batman and the imput with the value os the query string', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.getAttribute('value')).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toBe('/heroes/dc-batman.jpg');

    const searchHeroAlert = screen.getByLabelText('search-hero-alert');
    expect(searchHeroAlert.style.display).toBe('none');
  });

  test('should show an error if you doesn`t find the hero (batman123)', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const noResultsAlert = screen.getByLabelText('no-results-alert');
    const searchAlert = screen.getByLabelText('search-hero-alert');

    expect(noResultsAlert.style.display).toBe('');
    expect(searchAlert.style.display).toBe('none');
  });

  test('should call navigate to the new page when the user is searching', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'spider' } });
    const form = screen.getByLabelText('form');
    fireEvent.submit(form);
    // const button = screen.getByRole('button');
    // fireEvent.click(button);

    expect(useNavigateMock).toHaveBeenCalledWith('?q=spider');
  });
});
