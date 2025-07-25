import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '../components/Header'

describe('Header', () => {
  test('renders navigation elements', () => {
    render(<Header isMenuOpen={false} toggleMenu={() => {}} />)
    
    expect(screen.getByText('LuLu Ventures')).toBeInTheDocument()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
    expect(screen.getByText('Research')).toBeInTheDocument()
    expect(screen.getByText('App Tools')).toBeInTheDocument()
    expect(screen.getByText('Podcast')).toBeInTheDocument()
  })

  test('mobile menu toggle functionality', () => {
    const mockToggleMenu = vi.fn()
    render(<Header isMenuOpen={false} toggleMenu={mockToggleMenu} />)
    
    const menuButton = screen.getByLabelText(/toggle menu/i)
    fireEvent.click(menuButton)
    
    expect(mockToggleMenu).toHaveBeenCalledTimes(1)
  })

  test('smooth scroll navigation', () => {
    // Mock getElementById and scrollIntoView
    const mockElement = { scrollIntoView: vi.fn() }
    const mockGetElementById = vi.fn(() => mockElement)
    Object.defineProperty(document, 'getElementById', {
      value: mockGetElementById,
      writable: true
    })

    render(<Header isMenuOpen={false} toggleMenu={() => {}} />)
    
    const youtubeLink = screen.getByText('YouTube')
    fireEvent.click(youtubeLink)
    
    expect(mockGetElementById).toHaveBeenCalledWith('youtube')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    })
  })
})