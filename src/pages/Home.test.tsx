import Home from './Home'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
describe('Home page', () => {
  it('Mount component without crashing with authentication', () => {
    process.env.REACT_APP_AUTHENTICATION = 'true'
    render(<Home />)
    expect(screen.getByText('React Admin API dashboard')).toBeInTheDocument()
    expect(screen.getByText('activate')).toBeInTheDocument()
  })
  it('Mount component without crashing without authentication', () => {
    process.env.REACT_APP_AUTHENTICATION = 'false'
    render(<Home />)
    expect(screen.getByText('React Admin API dashboard')).toBeInTheDocument()
    expect(screen.getByText('disable')).toBeInTheDocument()
  })
})
