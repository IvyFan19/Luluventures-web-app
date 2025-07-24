import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/AuthContext'

const TestComponent = () => {
  const { isAuthenticated, login, logout } = useAuth()
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <button 
        onClick={() => login('test@example.com', 'password123')}
        data-testid="login-btn"
      >
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  )
}

const TestApp = () => (
  <AuthProvider>
    <TestComponent />
  </AuthProvider>
)

describe('AuthContext', () => {
  test('initial state is not authenticated', () => {
    render(<TestApp />)
    
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated')
  })

  test('login with valid credentials', async () => {
    render(<TestApp />)
    
    fireEvent.click(screen.getByTestId('login-btn'))
    
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
    }, { timeout: 1000 })
  })

  test('logout functionality', async () => {
    render(<TestApp />)
    
    // First login
    fireEvent.click(screen.getByTestId('login-btn'))
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated')
    })
    
    // Then logout
    fireEvent.click(screen.getByTestId('logout-btn'))
    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated')
  })
})