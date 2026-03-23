import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  test('renders the marketing navigation elements', () => {
    render(<Header isMenuOpen={false} toggleMenu={() => {}} goToScene={() => {}} />);

    expect(screen.getByText('DeepValues.ai')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'How It Works' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Community' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore now/i })).toBeInTheDocument();
  });

  test('mobile menu toggle button is accessible', () => {
    const mockToggleMenu = vi.fn();

    render(<Header isMenuOpen={false} toggleMenu={mockToggleMenu} />);

    fireEvent.click(screen.getByLabelText(/toggle menu/i));

    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  test('navigation triggers the homepage section callback', () => {
    const mockGoToScene = vi.fn();

    render(<Header isMenuOpen={false} toggleMenu={() => {}} goToScene={mockGoToScene} />);

    fireEvent.click(screen.getByRole('button', { name: 'How It Works' }));

    expect(mockGoToScene).toHaveBeenCalledWith(3);
  });
});
