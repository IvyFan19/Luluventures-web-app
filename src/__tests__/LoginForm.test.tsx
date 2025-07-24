import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../context/AuthContext'
import { LoginForm } from '../components/LoginForm'

const LoginFormWithProvider = () => (
  <AuthProvider>
    <LoginForm />
  </AuthProvider>
)

describe('LoginForm', () => {
  test('renders login form elements', () => {
    render(<LoginFormWithProvider />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  test('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<LoginFormWithProvider />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)
    
    expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument()
  })

  test('shows validation error for short password', async () => {
    const user = userEvent.setup()
    render(<LoginFormWithProvider />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, '123')
    await user.click(submitButton)
    
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
  })

  test('shows loading state during login', async () => {
    const user = userEvent.setup()
    render(<LoginFormWithProvider />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    expect(screen.getByText(/signing in/i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  test('successful login with valid credentials', async () => {
    const user = userEvent.setup()
    render(<LoginFormWithProvider />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.queryByText(/signing in/i)).not.toBeInTheDocument()
    }, { timeout: 1000 })
  })
})